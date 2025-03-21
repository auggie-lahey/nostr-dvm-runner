const child_process = require("child_process");
console.log('Starting child process...');

const isValidId = (id) => /^[0-9a-zA-Z\/\.\:\-]+$/.test(id.trim());
const isValidString = (id) => /^[a-zA-Z]+$/.test(id.trim());

const Terminal = (command) =>
  new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    const child = child_process.exec(
      command,
      { maxBuffer: 1500 * 1024 },
      function (error, stdout, stderr) {
        if (error) {
          console.error(`Error: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        resolve(stdout || stderr);
      }
    );

    child.stdout.on('data', (data) => {
      console.log(`Child stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`Child stderr: ${data}`);
    });
  });

exports.safeTerminal = {
  installModules: async (backendPath) => {
    await Terminal(`cd ${backendPath} && npm install`);
  },
  serve: async (backendPath) => {
    await Terminal(`cd ${backendPath} && node index.js`);
  },
  allContainers: () => Terminal(`docker ps -q -a`),
  inspectContainer: async (id) => {
    if (isValidId(id)) {
      return Terminal(`docker container inspect ${id}`);
    } else {
      throw new Error("The container id is invalid");
    }
  },
  generic: async (task, id) => {
    if (!isValidString(task)) {
      throw new Error("The task command is invalid.");
    }
    if (!isValidId(id)) {
      throw new Error("The container id is invalid");
    }
    return Terminal(`docker container ${task} ${id}`);
  },
  pull: async (id) => {
    if (!isValidId(id)) {
      throw new Error("The container id is invalid");
    }
    Terminal(`echo pulling ${id}`);
    return Terminal(`docker pull ${id}`);
  },
  logs: async (id) => {
    if (!isValidId(id)) {
      throw new Error("The container id is invalid");
    }
    return Terminal(`docker container logs ${id} --tail 1500`);
  },
  stats: () =>
    Terminal(
      `docker container stats --no-stream --format '{"id": "{{.ID}}", "cpu_percentage": "{{.CPUPerc}}", "memory_usage": "{{.MemUsage}}", "network_io": "{{.NetIO}}"}'`
    ),
  prune: (pruneType) => {
    if (!isValidString(pruneType)) {
      throw new Error("The entity type is not valid");
    }
    return Terminal(`docker ${pruneType} prune -f`);
  },
  containerLs: () => Terminal(`docker container ls --format '{{json .}}'`),
  formattedImages: () =>
    Terminal(
      `docker images --format '{"ID": "{{.ID}}", "Tag": "{{.Tag}}", "CreatedSince": "{{.CreatedSince}}", "Size": "{{.Size}}", "VirtualSize": "{{.VirtualSize}}", "Repository": "{{.Repository}}"}'`
    ),
  singleImage: (task, id, env) => {
    if (!isValidString(task)) {
      throw new Error("The task command is invalid.");
    }
    if (!isValidId(id)) {
      throw new Error("The image id is invalid");
    }
    if (task == "run") {
      const envs = env.replace(/\n/g, ' -e ')
      Terminal(`echo ==========================`)
      Terminal(`echo ${envs}`)
      Terminal(`echo docker ${task} -e ${envs} ${id}`)
      return Terminal(`docker ${task} -e ${envs} ${id}`);
    } else {
      return Terminal(`docker image ${task} ${id}`);
    }
  },
};