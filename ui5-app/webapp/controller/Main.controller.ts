import XMLView from 'sap/ui/core/mvc/XMLView';
import BaseController from './BaseController';

/**
 * @namespace com.thesistues.ui5app.controller
 */
export default class Main extends BaseController {
  public sayHello(): void {
    this.loadDynamicView();
  }
  private async loadDynamicView(): Promise<void> {
    try {
      // Load the dynamic view
      const dynamicView = await XMLView.create({
        viewName: 'com.thesistues.ui5app.view.SapUI5',
      });

      const page = this.byId('page') as sap.m.Page;
      page.addContent(dynamicView);
    } catch (error) {
      console.error('Error loading dynamic view:', error);
    }
  }
}
