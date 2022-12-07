import { solve_album } from "./func/solve_album.js";

const arg = process.argv.splice(2)
for (let index = 0; index < arg.length; index++) {
    const element = arg[index];
    console.log(await solve_album(element));
}