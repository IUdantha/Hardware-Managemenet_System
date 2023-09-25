Development(coding) of the project is handled in this branch.
Each functionality has seperate folders. Maintain the code seperately.
Each memeber can use the server.js, App.js, store.js files commonly.

#Clone the project 01. Create a branch that you need manually in GitHub (Branch source should be "master")
Ex: finance-maganement 02. Create a folder. 03. Right-click and select "Git Bash here" 04. Run the following
git clone -b master https://github.com/SLIITITP/y2_s2_wd_it_01-itp_wd_b07_g14.git 05. open VS code and navigate to the project folder
(You can also use 'code . ' command in Git bash)

# Push the changes you make to the remote repo

6.  Do the modifications
7.  in the terminal do the following (Make sure you are using git bash terminal)

    #Changes will be commited to the local repo 1. git add . (This command is used to add all the changes you made)
    (If you want to add only specific files or folders, You can give its name.
    ex: git add filename.extension ) 2. git commit -m "type message what you changed"

    #Push to your branch in the remote repo 3. git push origin master:my-branch
    Ex: git push origin master:finance-management

# Pull the modifications done by others in the remote repo to ur code

8.  Open the terminal.
9.  'git pull' command. (Make sure to run this command before pushing your modifications)

- Instructions by Mr.Isuru :) -

#After cloning the Project

1.  Create '.env' file inside the main folder in vs code.
2.  Then inclue the below code.
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = mongodb+srv://it21468360:it21468360@hardware-store-manageme.hhlska7.mongodb.net/hardwarestore?retryWrites=true&w=majority
    JWT_SECRET = abc123

3.  Open the Terminal
4.  Give the command 'npm install'
    (Dependencies will be installed)
5.  Then give the command 'cd frontend'.
6.  Then give the command 'npm install'
7.  frontend dependencies will be installed.

#All are invited to the online mongodb working space. Make sure to accept the invitation :)

1. Access the remoote working space.
2. Click 'Connect'.
3. Choose 'connect with mongodb compass'.
4. Download and install 'mongodb compass'. (It is easy to work in the GUI)
5. After installing, give this url to it. mongodb+srv://it21468360:it21468360@hardware-store-manageme.hhlska7.mongodb.net/hardwarestore
6. You will be able to access the cluster.
7. Create all the collections there, which you are going to use in the project.
