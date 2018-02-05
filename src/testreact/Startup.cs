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

using ourservers.io.Routing.RewriteRules;
using React.AspNet;
using SixLabors.ImageSharp.Web.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ourservers.io
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
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddReact();
			//todo check !
			//services.AddResponseCaching();
   //         services.AddResponseCompression();

            services.AddMemoryCache();
			// Add framework services.
			services
				.AddMvc(options =>
				{
					//options.Filters.Add(new LangFilter());
					//options.Filters.Add(new CmsETagFilter());
				});

            //services.AddLocalization(options => options.ResourcesPath = "Resources");

            //var builder = services.AddOurCMS(Configuration);
            //builder.Add((servicesCollection, config) =>
            //{
            //    foreach (var db in config.Databases)
            //    {
            //        var credentials = db.MongoClientSettings.Credentials.First();
            //        _CreateDB(db.DBName, credentials.Username, credentials.Password);
            //    }
            //});
            
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddImageSharp();

            //services.AddTransient((servicesProvider) =>
            //{
            //    return servicesProvider.GetService<IDBProvider>().Default.Database;
            //});
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
            //app.UseResponseCaching();
            //app.UseResponseCompression();
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
			app.UseReact(config =>
			{
				// If you want to use server-side rendering of React components,
				// add all the necessary JavaScript files here. This includes
				// your components as well as all of their dependencies.
				// See http://reactjs.net/ for more information. Example:
				
				// If you use an external build too (for example, Babel, Webpack,
				// Browserify or Gulp), you can improve performance by disabling
				// ReactJS.NET's version of Babel and loading the pre-transpiled
				// scripts. Example:
				config
					.SetLoadBabel(false)
					.AddScriptWithoutTransform("~/../scripts/dist/server.bundle.js");
			});
			app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = r => r.Context.Response.Headers.Add("Expires", DateTime.Now.AddDays(7).ToUniversalTime().ToString("r"))
            });

            //app.UseOurCMS();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                       name: "Page",
                       template: "",
                       defaults: new { controller = "Page", action = "Index" }
                       );

                //routes.MapRoute(
                //    name: "menu",
                //    template: "{lang}/{controller}/{id?}",
                //    defaults: new { controller = "Home", action = "Index" });
            });
        }

      
    }
}