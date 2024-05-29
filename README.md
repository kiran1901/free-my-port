free-my-port

Overview
free-my-port is a command-line utility to free up a specified port on your machine. It checks if the port is occupied, terminates the process using it, and notifies you when the port is free. It supports configuration files, colored output, and a smooth user experience with a progress spinner.

Installation
To install the package globally, run:

sh
Copy code
npm install -g free-my-port
Usage
Command Line Options
-p, --port <port>: Specify the port to free.
-c, --config <path>: Path to a configuration file.
Examples
Freeing a Port Directly
To free a port directly, use the -p option followed by the port number:

sh
Copy code
free-my-port -p 3000