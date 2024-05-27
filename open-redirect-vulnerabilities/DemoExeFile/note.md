# Publish as a self-contained single executable
dotnet publish -c Release -r win-x64 --self-contained /p:PublishSingleFile=true /p:IncludeAllContentForSelfExtract=true