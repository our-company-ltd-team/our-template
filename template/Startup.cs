using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using ourCompany.cms.Data.Providers;
using OURNAMESPACE.Routing.Filters;
using OURNAMESPACE.Routing.RewriteRules;
using SixLabors.ImageSharp.Web.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OURNAMESPACE
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCaching();
            services.AddResponseCompression();

            services.AddMemoryCache();
            // Add framework services.
            services
                .AddMvc(options =>
                {
                    options.Filters.Add(new LangFilter());
                    options.Filters.Add(new CmsETagFilter());
                })
                .AddRazorOptions(options => options.ParseOptions = new CSharpParseOptions(LanguageVersion.CSharp7));

            //services.AddLocalization(options => options.ResourcesPath = "Resources");

            var builder = services.AddOurCMS(Configuration);
            builder.Add((servicesCollection, config) =>
            {
                foreach (var db in config.Databases)
                {
                    var credentials = db.MongoClientSettings.Credentials.First();
                    _CreateDB(db.DBName, credentials.Username, credentials.Password);
                }
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddImageSharp();

            services.AddTransient((servicesProvider) =>
            {
                return servicesProvider.GetService<IDBProvider>().Default.Database;
            });
            services.AddTransient((servicesProvider) =>
            {
                var context = servicesProvider.GetService<IActionContextAccessor>()?.ActionContext;
                return servicesProvider.GetService<IUrlHelperFactory>().GetUrlHelper(context);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request
        // pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseResponseCaching();
            app.UseResponseCompression();
            //BsonClassMap.RegisterClassMap<MongoDBRef>();

            var options = new RewriteOptions()
                .Add(new HostRewriteRule("localhost", "leclercq.ourcompany.ch", "dropbox"));

            app.UseRewriter(options);

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Home/Error");
            }

            //var supportedCultures = new[]
            //    {
            //        new CultureInfo("fr"),
            //        new CultureInfo("en")
            //    };

            //app.UseRequestLocalization(new RequestLocalizationOptions
            //{
            //    DefaultRequestCulture = new RequestCulture(supportedCultures.First()),
            //    SupportedCultures = supportedCultures,
            //    SupportedUICultures = supportedCultures,
            //    RequestCultureProviders = new List<IRequestCultureProvider>() { new UrlRequestCultureProvider(), new AcceptLanguageHeaderRequestCultureProvider() }
            //});

            app.UseImageSharp();

            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = r => r.Context.Response.Headers.Add("Expires", DateTime.Now.AddDays(7).ToUniversalTime().ToString("r"))
            });

            app.UseOurCMS();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                       name: "Home",
                       template: "",
                       defaults: new { controller = "Home", action = "Index" }
                       );

                //routes.MapRoute(
                //    name: "menu",
                //    template: "{lang}/{controller}/{id?}",
                //    defaults: new { controller = "Home", action = "Index" });
            });
        }

        private void _CreateDB(string dbname, string username, string password)
        {
            var adminCredentials = MongoCredential.CreateCredential("admin", "manager", "mystique00R");
            var adminClientSeetings = new MongoClientSettings { Credentials = new List<MongoCredential> { adminCredentials } };

            var myDatabaseWithAdminCredentials = new MongoClient(adminClientSeetings).GetDatabase(dbname);
            var user = new BsonDocument { { "createUser", username }, { "pwd", password }, { "roles", new BsonArray { new BsonDocument { { "role", "dbOwner" }, { "db", dbname } } } } };
            try
            {
                var result = myDatabaseWithAdminCredentials.RunCommand<BsonDocument>(user);
            }
            catch
            {
            }
        }
    }
}