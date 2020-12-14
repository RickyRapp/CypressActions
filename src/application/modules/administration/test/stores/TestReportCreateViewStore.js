import { BaseEditViewStore } from 'core/stores';
import { TestReportCreateForm } from 'application/administration/test/forms';
import { AdministrationService } from 'application/administration/test/services';
import { observable } from 'mobx';
import { saveAs } from '@progress/kendo-file-saver';

class TestReportCreateViewStore extends BaseEditViewStore {
    @observable needName = false;

    constructor(rootStore, item, onAfterAction) {
        super(rootStore, {
            name: 'test-report',
            actions: () => {
                return {
                    create: async (resource) => {
                        const service = new AdministrationService(rootStore.application.baasic.apiClient);
                        const report = await service.generateReport({ template: item.abrv, contentType: "application/pdf", ...resource });
                        if (resource.isPreviewPrintInModal) {
                            const urlCreator = window.URL || window.webkitURL;
                            const file = new Blob([report.data], { type: 'application/pdf' });
                            const fileURL = urlCreator.createObjectURL(file);
                            const objFra = document.createElement('iframe');
                            objFra.style.visibility = 'hidden';
                            objFra.src = fileURL;
                            document.body.appendChild(objFra);
                            objFra.contentWindow.focus();
                            objFra.contentWindow.print();
                        }
                        else {
                            const nowDate = new Date();
                            const fileName = `${item.name.split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.pdf`;
                            saveAs(report.data, fileName);
                        }
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: TestReportCreateForm,
        });

        this.item = item;
        this.needName = false;

        switch (item.abrv) {
            case 'contributionPending':
                this.needName = true;
                break;
            case 'contributionFunded':
                break;
            case 'grantReceipt':
                break;
            default:
                break;
        }

        this.setAllCustom = () => {
            this.form.$('name').set('Hugh Marks');
        }
    }
}

export default TestReportCreateViewStore;
