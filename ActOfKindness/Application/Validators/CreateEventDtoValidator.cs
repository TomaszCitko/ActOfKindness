using Application.Dtos.Event;
using FluentValidation;
using System.Globalization;

namespace Application.Validators;

public class CreateEventDtoValidator : AbstractValidator<CreateEventDto>
{
    public CreateEventDtoValidator()
    {
        RuleFor(x => x.Localization).Length(0, 30);
        RuleFor(x => x.Title).Length(0, 80);
        RuleFor(x => x.Description).Length(0, 2000);
        RuleFor(x => x.StartingDate)
            .Must(DateHelper.BeAValidDate)
            .WithMessage("Invalid 'StartingDate' format. Should be 'dd/MM/yyyy'")
            .Must(date => DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture) >= DateTime.Now.Date)
            .WithMessage("'StartingDate' must be later than the current date and time");
        RuleFor(x => x.EndingDate)
            .Must(DateHelper.BeAValidDate)
            .WithMessage("Invalid 'EndingDate' format. Should be 'dd/MM/yyyy'")
            .Must((x, date) => DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture) >= DateTime.ParseExact(x.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture))
            .WithMessage($"'EndingDate' must be later than 'StartingDate'");
    }
}
