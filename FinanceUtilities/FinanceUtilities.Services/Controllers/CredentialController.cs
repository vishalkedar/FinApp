using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data;
using System.Threading;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;
using Newtonsoft.Json;

namespace FinanceUtilities.Services
{

    public class BaseApiController : ApiController
    {
        public HttpResponseMessage Options()
        {
            return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
        }
    }

    public class CredentialController : BaseApiController
    {
        FinanceUtilitesEntities fue = new FinanceUtilitesEntities();
        [HttpGet]
        [Authorize(Roles = "A")]
        public IEnumerable<User> getUserDetails()
        {
            FinanceUtilitesEntities fue = new FinanceUtilitesEntities();
            return fue.Users;
        }
        [Route("api/Credential/GetString")]
        public IHttpActionResult GetString()
        {
            return Content(HttpStatusCode.OK, "hello world");

        }

        //[HttpGet]
        [AllowAnonymous]
        [Route("api/Credential/RegisterUser")]
        public HttpResponseMessage RegisterUser([FromUri]User user)
        {
            try
            {
                HttpResponseMessage resp;
                if (user == null)
                {
                    resp = Request.CreateResponse(HttpStatusCode.BadRequest, "The user information is invalid");
                }
                else
                {
                    using (FinanceUtilitesEntities fue = new FinanceUtilitesEntities())
                    {
                        fue.Users.Add(new User
                        {
                            firstName = user.firstName,
                            lastName = user.lastName,
                            email = user.email,
                            mobile = user.mobile,
                            password = user.password,
                            userName = user.userName,
                            userType = "U"
                        });

                        fue.SaveChanges();
                    }
                    resp = Request.CreateResponse(HttpStatusCode.OK, "User has beed registered successfully.");
                }
                return resp;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("api/Credential/LoginUser")]
        public IHttpActionResult LoginUser(List<string> val)
        {
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    string uname = Convert.ToString(val[0]);
                    string password = Convert.ToString(val[1]);
                    var userinfo = db.Users.Where(o => o.userName == uname && o.password == password).FirstOrDefault();

                    if (userinfo != null)
                    {
                        LoginResponse _loginResponse = new Services.LoginResponse();
                        _loginResponse.user = userinfo;
                        _loginResponse.tokenValue = "tokenvalue";

                        Thread.CurrentPrincipal = new GenericPrincipal(
                            new GenericIdentity(uname), userinfo.userType.Split(','));



                        return Content(HttpStatusCode.OK, _loginResponse, Configuration.Formatters.JsonFormatter);
                    }
                    else
                        return Content(HttpStatusCode.NotFound, "User not found.");
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/Credential/LoginUserForAngualr")]
        public IHttpActionResult LoginUserForAngualr([FromUri]string username, [FromBody] string password)
        {
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    //string username = "";//Convert.ToString(username);
                    //string password = "";//Convert.ToString(password);
                    var userinfo = db.Users.Where(o => o.userName == username && o.password == password).FirstOrDefault();

                    if (userinfo != null)
                    {
                        LoginResponse _loginResponse = new Services.LoginResponse { user = new Services.User() };
                        _loginResponse.user.userName = userinfo.userName;
                        _loginResponse.user.firstName = userinfo.firstName;
                        _loginResponse.user.lastName = userinfo.lastName;
                        _loginResponse.user.userType = userinfo.userType;
                        _loginResponse.tokenValue = "tokenvalue," + userinfo.userName;

                        Thread.CurrentPrincipal = new GenericPrincipal(
                            new GenericIdentity(username), userinfo.userType.Split(','));
                        return Content(HttpStatusCode.OK, _loginResponse, Configuration.Formatters.JsonFormatter);
                    }
                    else
                        return Content(HttpStatusCode.NotFound, "User not found.");
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("api/Credential/GetUserInfoByToken")]
        public IHttpActionResult GetUserInfoByToken([FromBody] string token)
        {
            try
            {
                if (!string.IsNullOrEmpty(token))
                {
                    string[] userdata = token.Split(',');
                    string username = Convert.ToString(userdata[1]);
                    using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                    {
                        var userinfo = db.Users.Where(o => o.userName == username).FirstOrDefault();

                        if (userinfo != null)
                        {
                            LoginResponse _loginResponse = new Services.LoginResponse { user = new Services.User() };
                            _loginResponse.user.userName = userinfo.userName;
                            _loginResponse.user.firstName = userinfo.firstName;
                            _loginResponse.user.lastName = userinfo.lastName;
                            _loginResponse.user.userType = userinfo.userType;
                            _loginResponse.tokenValue = "tokenvalue," + userinfo.userName;

                            Thread.CurrentPrincipal = new GenericPrincipal(
                                new GenericIdentity(username), userinfo.userType.Split(','));
                            return Content(HttpStatusCode.OK, _loginResponse, Configuration.Formatters.JsonFormatter);
                        }
                        else
                            return Content(HttpStatusCode.NotFound, "User not found.");
                    }
                }
                else
                {
                    return Content(HttpStatusCode.NotFound, "User not found.");
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        [Route("api/Credential/Test")]
        public IHttpActionResult Test(string str)
        {
            return Content(HttpStatusCode.OK, "hello Angular4");
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("api/Credential/UserLogin")]
        public IHttpActionResult UserLogin(string username, string password)
        {
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    var userinfo = db.Users.Where(o => o.userName == username && o.password == password).FirstOrDefault();
                    if (userinfo != null)
                        return Content(HttpStatusCode.OK, userinfo);
                    else
                        return Content(HttpStatusCode.NotFound, "User not found.");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        [HttpPatch]
        public IHttpActionResult UpdateUserByPatch(int userId, [FromBody] string lastname)
        {
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    var userinfo = db.Users.FirstOrDefault(e => e.userId == userId);
                    userinfo.lastName = lastname;
                    db.SaveChanges();
                    return Content(HttpStatusCode.OK, "Updated successfully.");

                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        [HttpPut]
        [AllowAnonymous]
        [Route("api/Credential/UpdateUser")]
        public IHttpActionResult UpdateUser(int userId, [FromBody] User user)
        {
            // int userId = 1;
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    var userinfo = db.Users.FirstOrDefault(e => e.userId == userId);
                    if (userinfo != null)
                    {
                        userinfo.firstName = Convert.ToString(user.firstName).Trim();
                        userinfo.lastName = Convert.ToString(user.lastName).Trim();
                        userinfo.mobile = Convert.ToString(user.mobile).Trim();
                        userinfo.email = Convert.ToString(user.email).Trim();
                        db.Entry(userinfo).State = EntityState.Modified;
                        db.SaveChanges();

                        return Content(HttpStatusCode.OK, userinfo);
                    }
                    else
                        return Content(HttpStatusCode.NotModified, "User not found.");
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/Credential/AddUser")]
        public IHttpActionResult AddUser([FromBody] User user)
        {
            // int userId = 1;
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    db.Users.Add(user);
                    int userid = db.SaveChanges();
                    var newUser = db.Users.FirstOrDefault();
                    return Content(HttpStatusCode.Created, newUser);
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/Credential/UpdateUser")]
        public IHttpActionResult DeleteUser([FromBody] User user)
        {
            // int userId = 1;
            try
            {
                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                    return Content(HttpStatusCode.Created, "Record Added sucessfully.");
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [Route("api/Credential/GetAllUsers")]
        public IHttpActionResult GetAllUsers()
        {
            try
            {

                using (FinanceUtilitesEntities db = new FinanceUtilitesEntities())
                {


                    var userinfo = db.spGetAllUsers().ToList<spGetAllUsers_Result>();


                    //tokenValue = "tokenvalue," + userinfo.userName;

                    if (userinfo != null)

                        return Content(HttpStatusCode.OK, userinfo);
                    else
                        return Content(HttpStatusCode.NotFound, "Record not found.");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
