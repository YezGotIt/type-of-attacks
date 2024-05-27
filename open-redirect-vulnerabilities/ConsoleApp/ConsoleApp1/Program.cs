using System;
using System.IO;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads", "hacked.txt");
            File.WriteAllText(path, "You have been HACKED!!! by me");
        }
    }
}
