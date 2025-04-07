using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            var cssFiles = new[] { "index.css" };
            foreach (var fileName in cssFiles)
            {
                builder.MapGet($"/Static/CSS/{fileName}", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", fileName);
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
            }
        }

        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            var jsFiles = new[] { "index.js", "testing.js", "about.js" };
            foreach (var fileName in jsFiles)
            {
                builder.MapGet($"/Static/JS/{fileName}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", fileName);
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            }
        }

        public static void MapImg(this IEndpointRouteBuilder builder)
        {
            var imgFiles = new[] { "london.jpg", "ny.jpg", "spb.jpg" };
            foreach (var fileName in imgFiles)
            {
                builder.MapGet($"/Static/Images/{fileName}", async context =>
                {
                    var imgPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Images", fileName);
                    var img = await File.ReadAllBytesAsync(imgPath);
                    await context.Response.Body.WriteAsync(img);
                });
            }
        }

        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
            string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
            string sliderHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "slider.html"));

            builder.MapGet("/", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");

                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                   .Replace("<!--SIDEBAR-->", sideBarHtml)
                   .Replace("<!--FOOTER-->", footerHtml);

                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/testing", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);

                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/about", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");

                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml)
                    .Replace("<!--SLIDER-->", sliderHtml);

                await context.Response.WriteAsync(html.ToString());
            });
        }
    }
}
