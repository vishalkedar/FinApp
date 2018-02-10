using FinanceUtilities.WebUI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace FinanceUtilities.WebUI.Areas.User.Controllers
{
    [Authorize(Roles = "U")]
    public class UserController : Controller
    {
        // GET: User/User
        public ActionResult Index()
        {
            //using (var client = new HttpClient())
            //{

            //    GenericPrincipal gp = (GenericPrincipal)Thread.CurrentPrincipal;
            //    var ticket = ((FormsIdentity)HttpContext.User.Identity).Ticket;

            //    //HttpActionContext

            //    client.BaseAddress = new Uri("http://localhost:60970/");
            //    client.DefaultRequestHeaders.Accept.Clear();
            //    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(((string[])(ticket.Name.Split(':')))[1]);
            //    client.DefaultRequestHeaders.Add("roles", ticket.UserData);
            //    client.DefaultRequestHeaders.Add("username", ((string[])(ticket.Name.Split(':')))[0]);

            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


            //    var response = client.GetAsync("api/Credential/getUserDetails").Result;
            //}
            return View();
        }
    }
}