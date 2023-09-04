using Application.Dtos.User;
using FluentValidation;

namespace Application.Validators;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is a required field")
            .Length(3, 30).WithMessage("Username must be between 3 and 30 characters long")
            .Matches("^[A-Za-z0-9@+._-]+$")
            .WithMessage("Username can only consist of uppercase and lowercase letters, numbers, and the characters @ + . _ -");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is a required field")
            .Matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{7,40}$")
            .WithMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 7 and 40 characters long");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is a required field")
            .EmailAddress().WithMessage("Invalid email format");

        RuleFor(x => x.Nickname)
            .NotEmpty().WithMessage("Display Name is a required field")
            .Length(3, 30).WithMessage("Display Name must be between 3 and 30 characters long");
    }
}

