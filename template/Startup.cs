using ImageResizer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ourCompany.cms;

namespace template
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
            services.AddMemoryCache();
            // Add framework services.
            services
                .AddMvc()
                .AddRazorOptions(options => options.ParseOptions = new CSharpParseOptions(LanguageVersion.CSharp7));
            //.AddViewLocalization(opts => opts.ResourcesPath = "");

            services.AddOurCMS(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
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
            //        new CultureInfo("en"),
            //        new CultureInfo("fr"),
            //        new CultureInfo("nl")
            //    };

            //app.UseRequestLocalization(new RequestLocalizationOptions
            //{
            //    DefaultRequestCulture = new RequestCulture(supportedCultures.First()),
            //    SupportedCultures = supportedCultures,
            //    SupportedUICultures = supportedCultures,
            //    RequestCultureProviders = new List<IRequestCultureProvider>() { new UrlRequestCultureProvider() }
            //});

            app.UseMiddleware<ImageResizerMiddleware>();
            app.UseStaticFiles();
            app.UseOurCMS();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                       name: "Home",
                       template: "{lang?}",
                       defaults: new { controller = "Home", action = "Index" }
                       );

                //routes.MapRoute(
                //    name: "menu",
                //    template: "{lang}/{controller}/{id?}",
                //    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}