export function log(title: string, body: any = "") {
    console.log(`\n\t-- ${title.toUpperCase()} --`);
    console.log(body);
}