using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Security;

namespace FinanceUtilities.Services
{
    public class ValidateCredential
    {
        public User CheckCredential(string username, string password)
        {
            using (var ctx = new FinanceUtilitesEntities())
            {
                return ctx.Users.Where(un => un.userName == username && un.password == password).FirstOrDefault();
            }
        }
    }
    public class AuthenticationHandler : DelegatingHandler 
    { 

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            try
            {
                if (request.Headers.Authorization==null)
                {
                    return base.SendAsync(request, cancellationToken);
                }
                var tokens = request.Headers.GetValues("Authorization").FirstOrDefault();
                if (tokens != null)
                {
                    string username = request.Headers.GetValues("username").First();
                    string roles = request.Headers.GetValues("roles").First();
                    if (username != null)
                    {
                        IPrincipal principal = new GenericPrincipal(new GenericIdentity(username), roles.Split(','));
                        Thread.CurrentPrincipal = principal;
                        HttpContext.Current.User = principal;
                    }
                    else
                    {
                        //The user is unauthorize and return 401 status  
                        var response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                        var tsc = new TaskCompletionSource<HttpResponseMessage>();
                        tsc.SetResult(response);
                        return tsc.Task;
                    }
                }
                else
                {
                    //Bad Request request because Authentication header is set but value is null  
                    var response = new HttpResponseMessage(HttpStatusCode.Forbidden);
                    var tsc = new TaskCompletionSource<HttpResponseMessage>();
                    tsc.SetResult(response);
                    return tsc.Task;
                }
                return base.SendAsync(request, cancellationToken);

            }
            catch
            {
                //User did not set Authentication header  
                var response = new HttpResponseMessage(HttpStatusCode.Forbidden);
                var tsc = new TaskCompletionSource<HttpResponseMessage>();
                tsc.SetResult(response);
                return tsc.Task;
            }
        }

    }

    public class LoginResponse
    {
        public User user;
        public string tokenValue;
    }


}