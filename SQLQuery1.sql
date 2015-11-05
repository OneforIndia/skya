--g3fpfv3vl2.database.windows.net,1433
--Server=tcp:g3fpfv3vl2.database.windows.net,1433;Database=SKYA;User ID=skya@g3fpfv3vl2;Password={your_password_here};Trusted_Connection=False;Encrypt=True;Connection Timeout=30;

Create Table dbo.SiteMaster
(
	SiteID int identity(1,1),
	SiteURL	Varchar(500) Not null,
	constraint pk_sitemaster primary key(SiteURL)
)
 
Create Table dbo.SKYAMaster
(
	SiteID int,
	SessionMasterID varchar(100),
	loadTimeMins varchar(10),
	unloadTime varchar(10),
	language varchar(20),
	platform varchar(30),
	port varchar(30),
	client varchar(500),
	innerWidth int,
	innerHeight int,
	outerWidth int,
	outerHeight int,
	ip varchar(30),
	page varchar(1000),
	href varchar(2048),
	origin varchar(2048),
	title varchar(2048)
)

Create Table dbo.SKYACtrllog
(
	SKYACtrllogID int identity(1,1),
	SessionMasterID varchar(100),
	eventtype varchar(20),
	event varchar(20),
	targetTag varchar(2000),
	content varchar(max),
	clientPositionx varchar(20),
	clientPositiony varchar(20),
	createdAt datetime
)
