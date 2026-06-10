namespace Online_Travel_and_Hospitality.Interfaces
{
    // Interface for the phone syncing service
    public interface IPhoneSyncing
    {
        // Method to sync phone numbers between databases
        public Task PhoneSyncingMember();
    }
}
