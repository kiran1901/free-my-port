# free-my-port

free-my-port is a command-line utility designed to release a specified port on your machine. It simplifies the process of checking for port occupancy, terminating the process that is using it, and notifying you when the port becomes available. With support for configuration files, colored output, and a smooth user experience featuring a progress spinner, free-my-port enhances your port management tasks.

## Installation

To install the package globally, execute the following command:

```sh
npm install -g free-my-port
```

## Usage

### Command Line Options

- `-p, --port <port>`: Specify the port to free.
- `-c, --config <path>`: Path to a configuration file.

### Examples

#### Freeing a Port Directly

To free a port directly, use the `-p` option followed by the port number:

```sh
free-my-port -p 3000
```

## Configuration

free-my-port supports configuration files to streamline your port freeing tasks. You can specify default options or aliases for frequently used ports in a configuration file.

## Contributions

Contributions to free-my-port are welcomed! Feel free to submit bug reports, feature requests, or even pull requests via the [GitHub repository](https://github.com/kiran1901/free-my-port).


## Acknowledgments

- [Spinner](https://github.com/spinner): Used for providing a smooth progress indication.
- [Chalk](https://github.com/chalk): Utilized for adding colors to the console output.

---

With free-my-port, managing your ports efficiently has never been easier. Whether you're a developer running multiple services or a system administrator juggling various applications, free-my-port simplifies the process of freeing up ports, saving you time and effort.