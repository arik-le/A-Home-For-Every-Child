//Constants 
// user types Constants

//---------------------------------------------------------------//

var Clubhouse = function(name,address)
{
        this.name = name;
        this.address = address;
        this.PTusersList = [];           // list of parent or teacher user list - DB keys
        this.childList = [];           // list of child info contains photo,name  
        this.guidesList = [];        // list of all the guides / social workers with permission 
        this.ClubhouseDBkey;        
}

//---------------------------------------------------------------//

var Child = function(firstName,lastName,childBirthDate)
{
        this.firstName = childArgs.firstName;
        this.lastName = lastName;
		this.childBirthDate = childBirthDate;
        //this.profilePhoto;                 OPTIONAL depened on desigh chossing...
}

//---------------------------------------------------------------//

var personalMessage = function(pMessageArgs)
{
        this.source = pMessageArgs.source;
        this.destination = pMessageArgs.destination;
        this.date = pMessageArgs.date;
        this.subject = pMessageArgs.subject;
        this.content = pMessageArgs.content;
        this.isRead = false; //  new message is unread yet, when user opens this changed to //false
	this.messageDBkey;
}

//---------------------------------------------------------------//

var generalMessage = function(gMessageArgs)
{
        this.subject = gMessageArgs.subject;         //the subject of the message
        this.content = gMessageArgs.content;         //the content of the message
	this.source = gMessageArgs.source;
        this.destination = gMessageArgs.destination;
        this.date = gMessageArgs.date;
        this.messageDBkey;
}
