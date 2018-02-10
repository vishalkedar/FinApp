using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Web.Mvc;
using System.Web;
using System.Web.Security;

namespace WebApiConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            HttpClientHandler handler = new HttpClientHandler();
            
            HttpClient client = new HttpClient(handler);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Authorization", "dms6dms=");
            var result = client.GetAsync(new Uri("http://localhost:60970/api/Credential/UserLogin")).Result;
            if (result.IsSuccessStatusCode)
            {
                var data = result.Content.ReadAsStringAsync().Result;
             //   Console.WriteLine("Done" + result.Content.ReadAsStringAsync().Result);



            }
            else
                Console.WriteLine("Error" + result.StatusCode);

            HttpClientHandler handler1 = new HttpClientHandler();
            handler1.PreAuthenticate = true;
           // handler1
            HttpClient client1 = new HttpClient(handler1);
            client1.DefaultRequestHeaders.Add("isUserValidate", "true");
           // client1.DefaultRequestHeaders.
            client1.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Authorization", "dms6dms=");
           // HttpContext.Response.Cookies.Add("");

            var result11 = client1.GetAsync(new Uri("http://localhost:60970/api/Credential/GetString")).Result;
            if (result11.IsSuccessStatusCode)
            {
                Console.WriteLine("Done" + result11.Content.ReadAsStringAsync().Result);
            }
            Console.ReadLine();
        }
    }
}
