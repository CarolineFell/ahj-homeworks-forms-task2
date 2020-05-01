import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validate', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('Validate goods', () => {
    test('Should validate adding new product', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.add-product');
      addProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inputName = await page.$('#input-name');
      expect(await inputName.evaluate((node) => node.value)).toBe('');
    });

    test('Should validate editing the product', async () => {
      await page.goto(baseUrl);
      const editProduct = await page.$('.edit-product');
      editProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inputName = await page.$('#input-name');
      expect(await inputName.evaluate((node) => node.value)).not.toBe('');
    });

    test('Should validate adding the product input', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.add-product');
      addProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });

      const buttonSave = await page.$('#button-save');
      buttonSave.click();

      await page.waitForSelector('[id=form-error]', { visible: true });
    });

    test('Should validate deleting the product', async () => {
      await page.goto(baseUrl);
      const deleteProduct = await page.$('.delete-product');
      deleteProduct.click();

      await page.waitForSelector('[id=deleteBlock]', { visible: true });
    });
  });
});