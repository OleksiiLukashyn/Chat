using System;
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class Message
    {
        public int Id { set; get; }
        [Required]
        public string Text { set; get; }
        public DateTime When { set; get; }
        public string Sign { set; get; }
    }
}
