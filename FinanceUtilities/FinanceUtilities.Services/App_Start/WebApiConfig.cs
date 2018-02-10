using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FinanceUtilities.Services
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            config.MessageHandlers.Add(new AuthenticationHandler());
            //config.Filters.Add(new BasicAuthenticationAttribute());

            config.Formatters.Add(config.Formatters.JsonFormatter);

            EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors();
            //Enable Web API attribute level routing
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
