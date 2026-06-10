using Online_Travel_and_Hospitality.Interfaces;
namespace Online_Travel_and_Hospitality.Services
{
    public class PhoneSyncingBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public PhoneSyncingBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var phoneSyncing = scope.ServiceProvider.GetRequiredService<IPhoneSyncing>();
                    await phoneSyncing.PhoneSyncingMember(); // Call the syncing method  
                }

                // Wait for a specific interval before running again (e.g., every 1 minute)  
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
