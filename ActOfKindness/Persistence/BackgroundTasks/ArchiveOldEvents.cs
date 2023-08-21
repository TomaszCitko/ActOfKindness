using Application.Interfaces;
using Quartz;

namespace Persistence.BackgroundTasks
{
    public class ArchiveOldEvents : IJob
    {
        private readonly IEventRepository _eventRepository;

        public ArchiveOldEvents(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public Task Execute(IJobExecutionContext context)
        {
            _eventRepository.ArchiveOldEventsAsync();
            Thread.Sleep(50); //Without sleep, Quartz sometimes lost connection to database

            return Task.CompletedTask;
        }
    }
}
