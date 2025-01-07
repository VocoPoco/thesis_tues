export default {
	name: "QUnit test suite for the UI5 Application: com.thesistues.ui5app",
	defaults: {
		page: "ui5://test-resources/com/thesistues/ui5app/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 1
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "com/thesistues/ui5app/",
			never: "test-resources/com/thesistues/ui5app/"
		},
		loader: {
			paths: {
				"com/thesistues/ui5app": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.thesistues.ui5app"
		},
		"integration/opaTests": {
			title: "Integration tests for com.thesistues.ui5app"
		}
	}
};
