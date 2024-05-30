# free-my-port

free-my-port is a command-line utility designed to release a specified port on your machine. It simplifies the process of checking for port occupancy, terminating the process that is using it, and notifying you when the port becomes available. With support for configuration files, colored output, and a smooth user experience featuring a progress spinner, free-my-port enhances your port management tasks.

## Installation

To install the package globally, execute the following command:

## Features

- 🚀 **Free a Single Port**: Free an individual port.
- 🌐 **Free Multiple Ports**: Free multiple ports specified by a comma-separated list.
- 📊 **Free Port Ranges**: Free a range of ports.
- 🕹️ **Interactive Mode**: Select ports to free interactively.
- 🔍 **Port Usage Insights**: Get details about which processes are using specific ports.
- 🔄 **Retry Mechanism**: Retry freeing ports a specified number of times.
- 🌟 **Wildcard Port Freeing**: Support freeing multiple ports using wildcard patterns (e.g., `free-my-port -p 3000-3010`).

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
free-my-port -p 6969
```
#### Free Multiple Ports:

```sh
free-my-port -p 6969,6970,6971
```

#### Free a Range of Ports:

```sh
free-my-port -p 6969-7979
```

#### Interactive Mode:

```sh
free-my-port -i
```

#### Specify Number of Retries:

```sh
free-my-port -p 3000 -r 3
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