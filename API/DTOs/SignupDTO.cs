﻿namespace API.DTOs;

public class SignupDto
{
    public string UserId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime CreatedAt { get; set; }
}