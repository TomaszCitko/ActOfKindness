using Application.Dtos.Event;
using Application.Exceptions;
using Application.Interfaces;
using Application.Services;
using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace ApplicationUnitTests.Service
{
    public class EventServiceTests
    {
        private Mock<IEventRepository> _eventRepository;
        private Mock<IPhotoRepository> _photoRepository;

        private Mock<IMapper> _mapper;
        private Mock<IContextService> _contextService;
        private Mock<UserManager<AppUser>> _userManager;
        private EventService _eventService;

        private readonly Guid _eventId = new Guid();
        private readonly string _title = "Test title";
        private readonly string _description = "Test description";
        private readonly DateTime _startingDate = new DateTime(2023, 10,1);
        private readonly DateTime _endingDate = new DateTime(2023,10,10);
        private readonly EventType _eventType = EventType.HelpNeeded;
        private readonly int _defaultPageNumber = 1;
        private readonly int _pageSize = 10;

        [SetUp]
        public void SetUp()
        {
            _eventRepository = new Mock<IEventRepository>();
            _mapper = new Mock<IMapper>();
            _contextService = new Mock<IContextService>();
            _photoRepository = new Mock<IPhotoRepository>();

            var store = new Mock<IUserStore<AppUser>>();
            _userManager = new Mock<UserManager<AppUser>>(store.Object, null, null, null, null, null, null, null, null);

            _eventService = new EventService(_eventRepository.Object, _mapper.Object, _contextService.Object, _userManager.Object, _photoRepository.Object);
        }

        [Test]
        public async Task GetModeratedEventAsync_ReturnEmptyListOfDetailsEventDto_EventsAreNotExists()
        {
            var eventsFromEventRepository = new List<Event>();
            _eventRepository.Setup(x => x.GetModeratedEventsAsync(_defaultPageNumber, _pageSize))
                .ReturnsAsync(eventsFromEventRepository);

            _mapper.Setup(x => x.Map<List<DetailsEventDto>>(eventsFromEventRepository))
                .Returns(new List<DetailsEventDto>());

            var result = await _eventService.GetModeratedEventsAsync(_defaultPageNumber);

            Assert.IsEmpty(result.Items);
        }

        [Test]
        public async Task GetUnmoderatedEventAsync_ReturnEmptyListOfDetailsEventDto_EventsAreNotInDatabase()
        {
            var eventsFromEventRepository = new List<Event>();
            _eventRepository.Setup(x => x.GetUnmoderatedEventsAsync())
                .ReturnsAsync(eventsFromEventRepository);

            _mapper.Setup(x => x.Map<List<DetailsEventDto>>(eventsFromEventRepository))
                .Returns(new List<DetailsEventDto>());

            var result = await _eventService.GetUnmoderatedEventsAsync();

            Assert.IsEmpty(result);
        }

        [Test]
        public async Task CreateEventAsync_CreateNewEvent_CreateEventDtoIsCorrect()
        {
            var userId = new Guid().ToString();
            var newEventDto = new CreateEventDto(_eventId, null, false, _title, _description,
                _startingDate.ToString("dd/MM/yyyy"), _endingDate.ToString("dd/MM/yyyy"), null, null, _eventType, null);
            var newEvent = new Event()
            {
                Id = _eventId,
                Title = _title,
                Description = _description,
                StartingDate = _startingDate,
                EndingDate = _endingDate,
                Type = _eventType
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(newEventDto.Id))
                .ReturnsAsync((Event?)null);
            _mapper.Setup(x => x.Map<Event>(newEventDto))
                .Returns(newEvent);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            await _eventService.CreateEventAsync(newEventDto);

            _eventRepository.Verify(x => x.CreateEventAsync(newEvent), Times.Once);
            _eventRepository.Verify(x => x.SaveAsync(), Times.Once);
        }

        [Test]
        public async Task CreateEventAsync_ReplaceImageToPlaceHolder_ImageFromCreateEventDtoIsWhiteSpace()
        {
            const int expectedMinimumLengthForNonEmptyImageProperty = 2;
            var userId = new Guid().ToString();
            var newEventDto = new CreateEventDto(_eventId, null, false, _title, _description,
                _startingDate.ToString("dd/MM/yyyy"), _endingDate.ToString("dd/MM/yyyy"), null, null, _eventType, "");
            var newEvent = new Event()
            {
                Id = _eventId,
                Title = _title,
                Description = _description,
                StartingDate = _startingDate,
                EndingDate = _endingDate,
                Type = _eventType
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(newEventDto.Id))
                .ReturnsAsync((Event?)null);
            _mapper.Setup(x => x.Map<Event>(newEventDto))
                .Returns(newEvent);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            await _eventService.CreateEventAsync(newEventDto);

            Assert.Greater(newEvent.Image.Length, expectedMinimumLengthForNonEmptyImageProperty);
        }

        [Test]
        public void CreateEventAsync_ThrowBadRequestException_EventWithSameIdExist()
        {
            var newEventDto = new CreateEventDto(_eventId, null, false, _title, _description,
                _startingDate.ToString("dd/MM/yyyy"), _endingDate.ToString("dd/MM/yyyy"), null, null, _eventType, null);

            _eventRepository.Setup(x => x.GetEventByIdAsync(newEventDto.Id))
                .ReturnsAsync(new Event() { Id = _eventId });

            Assert.That(async () => await _eventService.CreateEventAsync(newEventDto), Throws.TypeOf<BadRequestException>());
        }

        [Test]
        public async Task DeleteEventAsync_DeleteEvent_EventExistAndBelongsToUser()
        {
            var eventCreatorId = Guid.NewGuid().ToString();
            const string userRole = "User";
            var eventToDelete = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToDelete);
            _contextService.Setup(x => x.GetUserId)
                .Returns(eventCreatorId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            await _eventService.DeleteEventAsync(_eventId);

            _eventRepository.Verify(x => x.DeleteEventAsync(eventToDelete.Id), Times.Once);
        }

        [Test]
        public void DeleteEventAsync_ThrowNotFoundException_EventNotExist()
        {
            var userId = Guid.NewGuid().ToString();
            const string userRole = "User";

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            Assert.That(async () => await _eventService.DeleteEventAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public void DeleteEventAsync_ThrowForbidException_UserTriesDeleteEventBelongingToAnotherUser()
        {
            var userId = Guid.NewGuid().ToString();
            var eventCreatorId = Guid.NewGuid().ToString();
            const string userRole = "User";
            var eventToDelete = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToDelete);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            Assert.That(async () => await _eventService.DeleteEventAsync(_eventId), Throws.TypeOf<ForbidException>());
        }

        [TestCase("Admin")]
        [TestCase("Moderator")]
        public async Task DeleteEventAsync_DeleteEvent_UserRoleIsNotUser(string userRole)
        {
            var userId = Guid.NewGuid().ToString();
            var eventCreatorId = Guid.NewGuid().ToString();
            var eventToDelete = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToDelete);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            await _eventService.DeleteEventAsync(_eventId);

            _eventRepository.Verify(x => x.DeleteEventAsync(eventToDelete.Id), Times.Once);
        }

        [Test]
        public void GetEventByIdAsync_ThrowNotFoundException_EventNotExist()
        {
            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);

            Assert.That(async () => await _eventService.GetEventByIdAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public async Task UpdateEventAsync_UpdateEvent_EventExistAndBelongsToUser()
        {
            var eventCreatorId = Guid.NewGuid().ToString();
            const string userRole = "User";
            var eventToUpdateDto = new EditEventDto() { };
            var eventToUpdate = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToUpdate);
            _contextService.Setup(x => x.GetUserId)
                .Returns(eventCreatorId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            await _eventService.UpdateEventAsync(_eventId, eventToUpdateDto);

            _eventRepository.Verify(x => x.UpdateEventAsync(_eventId, eventToUpdateDto));
        }

        [Test]
        public void UpdateEventAsync_ThrowNotFoundException_EventNotExist()
        {
            var userId = Guid.NewGuid().ToString();
            const string userRole = "User";
            var eventToUpdateDto = new EditEventDto() { };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            Assert.That(async () => await _eventService.UpdateEventAsync(_eventId, eventToUpdateDto), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public void UpdateEventAsync_ThrowForbidException_UserTriesUpdateEventBelongingToAnotherUser()
        {
            var userId = Guid.NewGuid().ToString();
            var eventCreatorId = Guid.NewGuid().ToString();
            const string userRole = "User";
            var eventToUpdateDto = new EditEventDto() { };
            var eventToUpdate = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToUpdate);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            Assert.That(async () => await _eventService.UpdateEventAsync(_eventId, eventToUpdateDto), Throws.TypeOf<ForbidException>());
        }

        [TestCase("Admin")]
        [TestCase("Moderator")]
        public async Task UpdateEventAsync_UpdateEvent_UserRoleIsNotUser(string userRole)
        {
            var userId = Guid.NewGuid().ToString();
            var eventCreatorId = Guid.NewGuid().ToString();
            var eventToUpdateDto = new EditEventDto() { };
            var eventToUpdate = new Event()
            {
                Id = _eventId,
                UserId = eventCreatorId
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventToUpdate);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _contextService.Setup(x => x.GetUserRole)
                .Returns(userRole);

            await _eventService.UpdateEventAsync(_eventId, eventToUpdateDto);

            _eventRepository.Verify(x => x.UpdateEventAsync(_eventId, eventToUpdateDto), Times.Once);
        }

        [Test]
        public void ModerateEventAsync_ModerateEvent_EventExist()
        {
            const int expectedRowChanged = 1;

            _eventRepository.Setup(x => x.ModerateEventAsync(_eventId))
                .ReturnsAsync(expectedRowChanged);

            Assert.DoesNotThrowAsync(async () => await _eventService.ModerateEventAsync(_eventId));
        }

        [Test]
        public void ModerateEventAsync_ThrowNotFoundException_EventNotExist()
        {
            const int expectedRowChanged = 0;

            _eventRepository.Setup(x => x.ModerateEventAsync(_eventId))
                .ReturnsAsync(expectedRowChanged);

            Assert.That(async () => await _eventService.ModerateEventAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public async Task GetParticipantsDtoAsync_ReturnListOfParticipantDto_EventHaveParticipants()
        {
            const string firstEventParticipantName = "Test Name User 1";
            const string firstEventParticipantLocation = "Test location User 1";
            const string secondEventParticipantName = "Test Name User 2";
            const string secondEventParticipantLocation = "Test location User 2";
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        EventId = _eventId,
                        User = new AppUser()
                        {
                            UserName = firstEventParticipantName,
                            Location = firstEventParticipantLocation
                        }
                    },
                    new EventUser()
                    {
                        EventId = _eventId,
                        User = new AppUser()
                        {
                            UserName = secondEventParticipantName,
                            Location = secondEventParticipantLocation
                        }
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);

            var result = await _eventService.GetParticipantsAsync(_eventId);

            Assert.AreEqual(firstEventParticipantName, result[0].UserName);
            Assert.AreEqual(firstEventParticipantLocation, result[0].Location);
            Assert.AreEqual(secondEventParticipantName, result[1].UserName);
            Assert.AreEqual(secondEventParticipantLocation, result[1].Location);
        }

        [Test]
        public async Task GetParticipantsDtoAsync_ReturnEmptyListOfParticipantDto_EventNotHaveParticipants()
        {
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);

            var result = await _eventService.GetParticipantsAsync(_eventId);

            Assert.IsEmpty(result);
        }

        [Test]
        public void GetParticipantsDtoAsync_ThrowNotFoundException_EventNotExist()
        {
            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);

            Assert.That(async () => await _eventService.GetParticipantsAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public async Task JoinEventAsync_UserJoinToEvent_UserIsNotEventParticipantAndEventNotHaveParticipants()
        {
            var userId = new Guid().ToString();
            var user = new AppUser()
            {
                Id = userId
            };
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _userManager.Setup(x => x.FindByIdAsync(userId))
                .ReturnsAsync(user);

            await _eventService.JoinEventAsync(_eventId);

            _eventRepository.Verify(x => x.SaveAsync(), Times.Once);
        }

        [Test]
        public async Task JoinEventAsync_UserJoinToEvent_UserIsNotEventParticipantAndEventHaveFewParticipants()
        {
            var userId = new Guid().ToString();
            var user = new AppUser()
            {
                Id = userId
            };
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        UserId = "1"
                    },
                    new EventUser()
                    {
                        UserId = "2"
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _userManager.Setup(x => x.FindByIdAsync(userId))
                .ReturnsAsync(user);

            await _eventService.JoinEventAsync(_eventId);

            _eventRepository.Verify(x => x.SaveAsync(), Times.Once);
        }

        [Test]
        public void JoinEventAsync_ThrowNotFoundException_EventNotExist()
        {
            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);

            Assert.That(async () => await _eventService.JoinEventAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public void JoinEventAsync_ThrowBadRequestException_EventHasEnded()
        {
            var userId = new Guid().ToString();
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                IsDone = true,
                Participants = new List<EventUser>()
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            Assert.That(async () => await _eventService.JoinEventAsync(_eventId), Throws.TypeOf<BadRequestException>());
        }

        [Test]
        public void JoinEventAsync_ThrowBadRequestException_UserIsEventParticipant()
        {
            var userId = new Guid().ToString();
            var user = new AppUser()
            {
                Id = userId
            };
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        UserId = userId,
                        User = user
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            Assert.That(async () => await _eventService.JoinEventAsync(_eventId), Throws.TypeOf<BadRequestException>());
        }

        [Test]
        public async Task LeaveEventAsync_UserLeaveEvent_UserIsEventParticipantAndEventNotHaveOthersParticipants()
        {
            var userId = new Guid().ToString();
            var user = new AppUser()
            {
                Id = userId
            };
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        UserId = userId,
                        User = user
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _userManager.Setup(x => x.FindByIdAsync(userId))
                .ReturnsAsync(user);

            await _eventService.LeaveEventAsync(_eventId);

            _eventRepository.Verify(x => x.SaveAsync(), Times.Once);
        }

        [Test]
        public async Task LeaveEventAsync_UserLeaveEvent_UserIsEventParticipantAndEventHaveOthersParticipants()
        {
            var userId = new Guid().ToString();
            var user = new AppUser()
            {
                Id = userId
            };
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        UserId = "1"
                    },
                    new EventUser()
                    {
                        UserId = userId,
                        User = user
                    },
                    new EventUser()
                    {
                        UserId = "2"
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);
            _userManager.Setup(x => x.FindByIdAsync(userId))
                .ReturnsAsync(user);

            await _eventService.LeaveEventAsync(_eventId);

            _eventRepository.Verify(x => x.SaveAsync(), Times.Once);
        }

        [Test]
        public void LeaveEventAsync_ThrowNotFoundException_EventNotExist()
        {
            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync((Event?)null);

            Assert.That(async () => await _eventService.LeaveEventAsync(_eventId), Throws.TypeOf<NotFoundException>());
        }

        [Test]
        public void LeaveEventAsync_ThrowBadRequestException_UserIsNotEventParticipant()
        {
            var userId = new Guid().ToString();
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                Participants = new List<EventUser>()
                {
                    new EventUser()
                    {
                        UserId = "1"
                    },
                    new EventUser()
                    {
                        UserId = "2"
                    }
                }
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            Assert.That(async () => await _eventService.LeaveEventAsync(_eventId), Throws.TypeOf<BadRequestException>());
        }

        [Test]
        public void LeaveEventAsync_ThrowBadRequestException_EventHasEnded()
        {
            var userId = new Guid().ToString();
            var eventFromRepository = new Event()
            {
                Id = _eventId,
                IsDone = true,
                Participants = new List<EventUser>()
            };

            _eventRepository.Setup(x => x.GetEventByIdAsync(_eventId))
                .ReturnsAsync(eventFromRepository);
            _contextService.Setup(x => x.GetUserId)
                .Returns(userId);

            Assert.That(async () => await _eventService.LeaveEventAsync(_eventId), Throws.TypeOf<BadRequestException>());
        }
    }
}
