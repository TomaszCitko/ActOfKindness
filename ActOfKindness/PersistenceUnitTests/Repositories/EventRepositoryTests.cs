using Bogus;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Repositories;

namespace PersistenceUnitTests.Repositories
{
    public class EventRepositoryTests
    {
        private readonly EventRepository _eventRepository;
        private readonly IEnumerable<Event> _eventsFromDB;
        private const int PageNumber = 1;
        private const int PageSize = 10;
        private readonly string[] _usersNames = new[] { "User1", "User2", "User3", "User4", "User5" };

        public EventRepositoryTests()
        {
            var dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "ActOfKindnessTestInMemoryDatabase")
                .Options;
            var dbContext = new ApplicationDbContext(dbContextOptions);
            _eventsFromDB = InitializeInMemoryDatabase(dbContext);
            _eventRepository = new EventRepository(dbContext);
        }

        private IEnumerable<Event> InitializeInMemoryDatabase(ApplicationDbContext dbContext)
        {
            var users = new List<AppUser>();

            foreach (var usersName in _usersNames)
            {
                users.Add(new AppUser()
                {
                    UserName = usersName
                });
            }

            var comment = new Faker<Comment>()
                .RuleFor(c => c.Body, f => f.Lorem.Sentence())
                .RuleFor(c => c.Author, f => f.PickRandom(users));

            var fakeEvent = new Faker<Event>()
                .StrictMode(false)
                .RuleFor(e => e.CreatedBy, f => f.PickRandom(users))
                .RuleFor(e => e.Title, f => f.Lorem.Sentence())
                .RuleFor(e => e.Description, f => f.Lorem.Sentences(5))
                .RuleFor(e => e.StartingDate, f => f.Date.Recent())
                .RuleFor(e => e.EndingDate, f => f.Date.Soon())
                .RuleFor(e => e.IsDone, f => f.Random.Bool())
                .RuleFor(e => e.IsModerated, f => f.Random.Bool())
                .RuleFor(e => e.Type, f => f.PickRandom<EventType>())
                .RuleFor(e => e.Image, f => f.Image.PlaceImgUrl())
                .RuleFor(e => e.Comments, f => comment.Generate(f.Random.Int(0, 5)));

            var fakeEvents = fakeEvent.Generate(10);
            dbContext.Events.AddRange(fakeEvents);
            dbContext.SaveChanges();

            return fakeEvents.AsQueryable();
        }

        [Test]
        public async Task GetModeratedEventsAsync_ReturnListOfModeratedAndNotDoneEvents_PageNumberAndPageSizeArePassed()
        {
            var result = await _eventRepository.GetModeratedEventsAsync(PageNumber, PageSize);

            Assert.IsTrue(result.All(e => e.IsModerated && !e.IsDone));
            Assert.LessOrEqual(result.Count, PageSize);
        }

        [Test]
        public async Task GetUserEventsAsync_ReturnListOfEventsCreatedByUser_UserNameIsPassed()
        {
            var userName = _usersNames[0];
            var result = await _eventRepository.GetUserEventsAsync(userName);

            Assert.IsTrue(result.All(e => e.CreatedBy.UserName == userName));
        }

        [Test]
        public async Task GetUnmoderatedEventsAsync_ReturnListOfUnmoderatedEvents_WhenMethodCall()
        {
            var result = await _eventRepository.GetUnmoderatedEventsAsync();

            Assert.IsTrue(result.All(e => !e.IsModerated));
        }

        [Test]
        public async Task GetEventByIdAsync_ReturnEvent_IdIsPassed()
        {
            var eventId = _eventsFromDB.FirstOrDefault()!.Id;

            var result = await _eventRepository.GetEventByIdAsync(eventId);

            Assert.AreEqual(eventId, result.Id);
        }

        [Test]
        public async Task GetEventByIdForComments_ReturnEventWithComments_IdIsPassed()
        {
            var eventId = _eventsFromDB.FirstOrDefault()!.Id;

            var result = await _eventRepository.GetEventByIdForComments(eventId);

            Assert.AreEqual(eventId, result.Id);
        }
    }
}
