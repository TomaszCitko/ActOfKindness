using Application.Dtos.Event;
using FluentValidation;

namespace Application.Validators;

public class CreateEventDtoValidator : AbstractValidator<CreateEventDto>
{
    public CreateEventDtoValidator()
    {
        RuleFor(x => x.Localization).Length(0, 30);
        RuleFor(x => x.Title).Length(0, 80);
        RuleFor(x => x.Description).Length(0, 2000);
        RuleFor(x => x.StartingDate)
            .Must(date => date > DateTime.Now)
            .WithMessage("'StartingDate' must be later than the current date and time")
            .LessThan(x => x.EndingDate)
            .WithMessage("'StartingDate' must be earlier than 'EndingDate'");
        RuleFor(x => x.EndingDate)
            .GreaterThan(x => x.StartingDate)
            .WithMessage("'EndingDate' must be later than 'StartingDate'");
    }
}

