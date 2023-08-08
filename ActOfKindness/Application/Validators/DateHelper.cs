using System.Globalization;

namespace Application.Validators;

public static class DateHelper
{
    public static bool BeAValidDate(string dateString)
    {
        return DateTime.TryParseExact(dateString, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }
}

