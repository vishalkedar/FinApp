using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace FinanceUtilities.WebUI.Models
{
    public class UserModel
    {
        public int userId { get; set; }
        [Display(Name ="User Name")]
        [Required(ErrorMessage ="The User Name is required.")]
        public string userName { get; set; }
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "The Password is required.")]
        public string password { get; set; }
        [MaxLength(10,ErrorMessage ="Mobile number should be 10 digit.")]
        [MinLength(10, ErrorMessage = "Mobile number should be 10 digit.")]
        public string mobile { get; set; }
        public string email { get; set; }
        [Display(Name = "First Name")]
        [Required(ErrorMessage = "The first Name is required.")]
        public string firstName { get; set; }
        [Display(Name = "last Name")]
        [Required(ErrorMessage = "The last Name is required.")]
        public string lastName { get; set; }
        public string userType { get; set; }


    }

    public class LoginResponse
    {
        public UserModel user;
        public string tokenValue;
    }
}