using AutoMapper;
using System.Reflection;

namespace ApplicationUnitTests.Mappings
{
    public class EventMappingProfileTests
    {
        private IMapper _mapper;
        private MapperConfiguration _configuration;

        [SetUp]
        public void Setup()
        {
            _configuration = new MapperConfiguration(cfg => cfg.AddMaps(Assembly.GetExecutingAssembly()));
            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ConfigurationTest()
        {
            _configuration.AssertConfigurationIsValid();

            Assert.Pass();
        }
    }
}
