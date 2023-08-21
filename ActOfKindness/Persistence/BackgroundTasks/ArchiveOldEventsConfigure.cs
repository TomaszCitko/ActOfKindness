using Microsoft.Extensions.Options;
using Quartz;

namespace Persistence.BackgroundTasks
{
    public class ArchiveOldEventsConfigure : IConfigureOptions<QuartzOptions>
    {
        public void Configure(QuartzOptions options)
        {
            var jobKey = JobKey.Create(nameof(ArchiveOldEvents));

            options.AddJob<ArchiveOldEvents>(opt => opt.WithIdentity(jobKey))
                .AddTrigger(trigger =>
                    trigger
                        .ForJob(jobKey)
                        .WithSimpleSchedule(schedule =>
                            schedule
                                .WithIntervalInHours(24)
                                .RepeatForever()));
        }
    }
}
