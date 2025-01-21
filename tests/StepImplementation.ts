
import { Step, Table, BeforeSuite, AfterSuite } from "gauge-ts";
import assert = require("assert");
import LoginPage from "../pageObjects/login.page";
const password = process.env.PASSWORD;


export default class StepImplementation {
    const loginPage = new LoginPage();

    // @BeforeSuite()

    // @AfterSuite()
    // public async afterSuite() {
    //     await closeBrowser();
    // };

    @Step("Open test website")
    loginPage.navigateToLogin()
    
    @Step("Login with <password> and <table>")
    public async loginWithValidCredentials(password: string, table: Table) {
        for (var row of table.getTableRows()) {
            await write(row.getCell('username'), into(textBox({placeholder: "Username"})));
            console.log(row.getCell('username'));
            await write(password, into(textBox({ placeholder: "Password" })));
            await click("Login");
        }
        // await write(username, into(textBox({ placeholder: "Username" })));
    }

    @Step("Check login form UI")
    public async checkLoginUI() {
        assert.ok(await textBox({placeholder: "Username"}).exists(3, 1));
        assert.ok(await textBox({placeholder: "Password"}).exists(3, 1));
        assert.ok(await button("Login").exists(3, 1));
    }

    @Step("Verify login successful")
    public async verifyLoginSuccessful() {
        assert.ok(await text("Products").exists());
    }

    @Step("Add to cart <table>")
    public async addItemToCart(table: Table) {
        await click(button(text('Add to cart')));
    }

    @Step("Complete tasks <table>")
    public async completeTasks(table: Table) {
        for (var row of table.getTableRows()) {
            await click(checkBox(toLeftOf(row.getCell("description"))));
        }
    }

    @Step("View <type> tasks")
    public async viewTasks(type: string) {
        await click(link(type));
    }

    @Step("Must have <table>")
    public async mustHave(table: Table) {
        for (var row of table.getTableRows()) {
            assert.ok(await text(row.getCell("description")).exists());
        }
    }

    @Step("Must not have <table>")
    public async mustNotHave(table: Table) {
        for (var row of table.getTableRows()) {
            assert.ok(!await text(row.getCell("description")).exists(0, 0));
        }
    }

    @Step("Clear all tasks")
    public async clearAllTasks() {
        // @ts-ignore
        await evaluate(() => localStorage.clear());
    }

}
