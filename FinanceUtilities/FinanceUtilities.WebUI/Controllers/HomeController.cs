using FinanceUtilities.WebUI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;


namespace FinanceUtilities.WebUI.Controllers
{

    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewData["IsSuccess"] = "false";
            return View();
        }

        [HttpPost]
        public ActionResult RegisterUser(UserModel userModel)
        {
            try
            {
                ViewData["IsSuccess"] = "true";
                if (ModelState.IsValid)
                {
                    //call service 
                    //http://localhost:60970/api/Credential/RegisterUser

                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri("http://localhost:60970/");
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        var user = new StringContent(JsonConvert.SerializeObject(userModel), Encoding.UTF8, "application/json");

                        var response = client.PostAsync("api/Credential/RegisterUser", user).Result;
                        // var response = client.GetAsync("api/values/10").Result;
                        if (response.IsSuccessStatusCode)
                        {
                            string responseString = response.Content.ReadAsStringAsync().Result;
                        }
                        else
                            throw new HttpException(404, response.ReasonPhrase);

                    }


                    return View("Index");
                }
                else
                    throw new HttpException(404, "Please enter all fields.");

            }
            catch (Exception ex)
            {
                throw new HttpException(404, ex.Message);
            }


        }

        public ViewResult ResetPassword()
        {

            return View();
        }

        //[HttpPost]

        public ActionResult Login(string username, string password)
        {

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return RedirectToAction("Index");
            }

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:60970/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                List<string> credentialList = new List<string>();
                credentialList.Add(username);
                credentialList.Add(password);
                string jsonstr = JsonConvert.SerializeObject(credentialList);
                string jstr = JsonConvert.SerializeObject(credentialList);

                var credential = new StringContent(JsonConvert.SerializeObject(credentialList), Encoding.UTF8, "application/json");

                var response = client.PostAsync("api/Credential/LoginUser", credential).Result;

                if (response.IsSuccessStatusCode)
                {
                    string responseString = response.Content.ReadAsStringAsync().Result;
                    LoginResponse data = JsonConvert.DeserializeObject<LoginResponse>(responseString);
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, username + ":" + data.tokenValue, DateTime.Now, DateTime.Now.AddMinutes(30000), false, data.user.userType);
                    string encryptedTicket = FormsAuthentication.Encrypt(ticket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    HttpContext.Response.Cookies.Add(authCookie);

                    if (data.user.userType == "A")
                        return Json(new { url = Url.Action("Index", "Admin/Admin") });
                    else
                        return Json(new { url = Url.Action("Index", "User/User") });
                }
                else
                    throw new HttpException(404, response.ReasonPhrase);
            }
        }
        [HttpPost]
        public ActionResult LogOff()
        {

            FormsAuthentication.SignOut();
            HttpContext.Response.Cookies.Remove("authCookie");
            return RedirectToAction("Index", "Home");
        }
    }

    public class BasicAuthorizationAttribute : AuthorizeAttribute
    {

        public override void OnAuthorization(AuthorizationContext filterContext)
        {



            Dictionary<decimal, decimal> dic = new Dictionary<decimal, decimal>();

            dic.Add(Convert.ToDecimal(1.01),Convert.ToDecimal(1.02));


            //string[] roles = ((FormsIdentity)((System.Security.Principal.GenericPrincipal)((HttpContextWrapper)filterContext.HttpContext).User).Identity).Ticket.UserData.Split(':');

            //this.Roles = roles[0];
            //  string[] r = new string[] {this.Roles,"" };

            //Thread.CurrentPrincipal = new GenericPrincipal(
            //    new GenericIdentity(filterContext.HttpContext.User.Identity.Name), r);

            // Thread.CurrentPrincipal = principal;
            //   HttpContext.Current.User = Thread.CurrentPrincipal;

            base.OnAuthorization(filterContext);
        }
    }
}