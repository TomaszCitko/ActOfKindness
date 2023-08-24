using Application.Dtos.Event;
using FluentValidation;
using System.Globalization;

namespace Application.Validators;

public class EditEventDtoValidator : AbstractValidator<EditEventDto>
{
    public EditEventDtoValidator()
    {
        RuleFor(x => x.Localization)
            .NotEmpty().WithMessage("Localization is a required field")
            .Length(1, 30).WithMessage("Localization must be between 1 and 30 characters long");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is a required field")
            .Length(1, 80).WithMessage("Title must be between 1 and 80 characters long");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is a required field")
            .Length(1, 2000).WithMessage("Description must be between 1 and 2000 characters long");

        RuleFor(x => x.StartingDate)
            .Must(DateHelper.BeAValidDate)
            .WithMessage("Invalid 'StartingDate' format. Should be 'dd/MM/yyyy'");
        RuleFor(x => x.EndingDate)
            .Must(DateHelper.BeAValidDate)
            .WithMessage("Invalid 'EndingDate' format. Should be 'dd/MM/yyyy'")
            .Must(date => DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture) >= DateTime.Now.Date)
            .WithMessage("'EndingDate' must be later than the current date and time")
            .Must((x, date) => DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture) >= DateTime.ParseExact(x.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture))
            .WithMessage($"'EndingDate' must be later than 'StartingDate'");
    }
}

