using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Controllers;
using Online_Travel_and_Hospitality.Models.Domain;

namespace DependencyInjectionTestProject
{
    // Unit tests for the ContactUsController.
    [TestFixture]
    public class ContactUsControllerTests
    {
        private ContactUsController _controller;

        // Sets up the ContactUsController and initializes the in-memory contacts list before each test.
        [SetUp]
        public void Setup()
        {
            _controller = new ContactUsController();

            // Reset the static contacts list to an empty list for isolation between tests.
            typeof(ContactUsController)
                .GetField("contacts", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static)
                ?.SetValue(null, new List<ContactUs>());
        }

        // Tests that GetContacts returns an OkObjectResult with an empty list of contacts initially.
        [Test]
        public void GetContacts_ShouldReturnOkWithListOfContacts()
        {
            // Act: Call the GetContacts method.
            var result = _controller.GetContacts();

            // Assert: Verify the response is OkObjectResult and contains an empty list.
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult but got null.");
            var contacts = okResult.Value as List<ContactUs>;
            Assert.IsNotNull(contacts, "Expected a list of contacts but got null.");
            Assert.That(contacts.Count, Is.EqualTo(0), "Expected the contacts list to be empty initially.");
        }


        // Tests that CreateContact returns CreatedAtActionResult when a valid contact is provided.
        [Test]
        public void CreateContact_ValidContact_ShouldReturnCreatedAtAction()
        {
            // Arrange: Create a valid ContactUs object.
            var contact = new ContactUs
            {
                Name = "John Doe",
                Email = "johndoe@example.com",
                Subject = "Test Subject",
                Message = "Test Message"
            };

            // Act: Call the CreateContact method with the valid contact.
            var result = _controller.CreateContact(contact);

            // Assert: Verify the response is CreatedAtActionResult and contains the created contact.
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
            var createdResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.That(createdResult.ActionName, Is.EqualTo(nameof(ContactUsController.GetContacts)));
            var returnedContact = createdResult.Value as ContactUs;
            Assert.IsNotNull(returnedContact);
            Assert.That(returnedContact.Name, Is.EqualTo(contact.Name));
            Assert.That(returnedContact.Email, Is.EqualTo(contact.Email));
        }

        // Tests that CreateContact returns BadRequestObjectResult when an invalid contact is provided.
        [Test]
        public void CreateContact_InvalidContact_ShouldReturnBadRequest()
        {
            // Arrange: Create an invalid ContactUs object with missing required fields.
            var invalidContact = new ContactUs
            {
                Name = "",
                Email = "",
                Subject = "Test Subject",
                Message = "Test Message"
            };

            // Act: Call the CreateContact method with the invalid contact.
            var result = _controller.CreateContact(invalidContact);

            // Assert: Verify the response is BadRequestObjectResult with an appropriate error message.
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.That(badRequestResult.Value, Is.EqualTo("Invalid contact data."));
        }

        // Tests that CreateContact returns BadRequestObjectResult when a null contact is provided.
        [Test]
        public void CreateContact_NullContact_ShouldReturnBadRequest()
        {
            // Act: Call the CreateContact method with a null contact.
            var result = _controller.CreateContact(null);

            // Assert: Verify the response is BadRequestObjectResult with an appropriate error message.
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.That(badRequestResult.Value, Is.EqualTo("Invalid contact data."));
        }

    }
}
