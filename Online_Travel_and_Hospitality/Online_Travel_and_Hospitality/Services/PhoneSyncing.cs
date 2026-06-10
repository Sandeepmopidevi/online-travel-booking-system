using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Interfaces;
using System; // For Exception

namespace Online_Travel_and_Hospitality.Services
{
    // This class implements the phone syncing functionality
    public class PhoneSyncing : IPhoneSyncing
    {
        // Private fields to hold the database contexts
        private readonly AuthDbContext authDbContext;
        private readonly ApplicationDbContext dataDbContext;

        public PhoneSyncing(AuthDbContext authDbContext,
            ApplicationDbContext dataDbContext)
        {
            this.authDbContext = authDbContext;
            this.dataDbContext = dataDbContext;
        }

        // Method to sync phone numbers between the two databases
        public async Task PhoneSyncingMember()
        {
            try
            {
                var listOfUsersfromdataDB = await dataDbContext.Users.ToListAsync();
                var listofUsersfromauthDB = await authDbContext.Users.ToListAsync();

                foreach (var user_datadb in listOfUsersfromdataDB)
                {
                    foreach (var user_authdb in listofUsersfromauthDB)
                    {
                        if (user_datadb.Email == user_authdb.Email)
                        {
                            if (user_authdb.PhoneNumber == user_datadb.ContactNumber)
                            {
                                //do nothing.
                                //continue;
                            }
                            else
                            {
                                user_authdb.PhoneNumber = user_datadb.ContactNumber;

                                authDbContext.Entry(user_authdb).State = EntityState.Modified;

                                // Save the changes to the authentication database
                                await authDbContext.SaveChangesAsync();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle or log the exception as needed
                // For example, you can log to a file, database, or throw again
                // Here, just rethrowing for demonstration
                throw new Exception("An error occurred in PhoneSyncingMember.", ex);
            }
        }
    }
}