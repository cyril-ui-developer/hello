import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as _ from 'lodash';
import { Provider } from 'react-redux';
// import { match as RouterMatch } from 'react-router-dom';
// import { Table, DetailsPage, MultiListPage, ListPage } from '@console/internal/components/factory';
// import {
//   Timestamp,
//   LabelList,
//   StatusBox,
//   ResourceKebab,
//   FirehoseResourcesResult,
// } from '@console/internal/components/utils';
// import * as k8sModels from '@console/internal/module/k8s';
import store from '@console/internal/redux';
// import * as extensionHooks from '@console/plugin-sdk';
// import { referenceForProvidedAPI } from '..';
import {
//   testCRD,
//   testResourceInstance,
  testClusterServiceVersion,
//   testOwnedResourceInstance,
//   testModel,
//   testConditionsDescriptor,
} from '../../../mocks';
import { ClusterServiceVersionModel } from '../../models';
// import { DescriptorDetailsItem, DescriptorDetailsItemList } from '../descriptors';
// import { Resources } from '../k8s-resource';
// import { OperandLink } from './operand-link';
import {
//   OperandList,
//   OperandListProps,
//   ProvidedAPIsPage,
//   ProvidedAPIsPageProps,
//   OperandTableRowProps,
//   OperandTableRow,
//   OperandDetails,
//   OperandDetailsPageProps,
//   OperandDetailsProps,
//   OperandDetailsPage,
  ProvidedAPIPage,
  ProvidedAPIPageProps,
} from '.';
import { ListPageBody } from '@console/dynamic-plugin-sdk';
import ListPageHeader from '@console/internal/components/factory/ListPage/ListPageHeader';
import { Router } from 'react-router';
import { history } from '@console/internal/components/utils';
import {
    ListPageCreateLink,
  } from '@console/internal/components/factory/ListPage/ListPageCreate';
 // import { OperandList } from './index'
import ListPageFilter from '@console/internal/components/factory/ListPage/ListPageFilter';
import { error } from "console";

jest.mock('@console/shared/src/hooks/useK8sModels', () => ({
  useK8sModels: () => [
    {
      'testapp.coreos.com~v1alpha1~TestResource': {
        abbr: 'TR',
        apiGroup: 'testapp.coreos.com',
        apiVersion: 'v1alpha1',
        crd: true,
        kind: 'TestResource',
        label: 'Test Resource',
        labelPlural: 'Test Resources',
        namespaced: true,
        plural: 'testresources',
        verbs: ['create'],
      },
    },
    false,
    null,
  ],
}));

jest.mock('@console/shared/src/hooks/useK8sModel', () => {
  return {
    useK8sModel: (groupVersionKind) => [
      groupVersionKind === 'TestResourceRO'
        ? {
            abbr: 'TR',
            apiGroup: 'testapp.coreos.com',
            apiVersion: 'v1alpha1',
            crd: true,
            kind: 'TestResourceRO',
            label: 'Test Resource',
            labelPlural: 'Test Resources',
            namespaced: true,
            plural: 'testresources',
            verbs: ['get'],
          }
        : {
            abbr: 'TR',
            apiGroup: 'testapp.coreos.com',
            apiVersion: 'v1alpha1',
            crd: true,
            kind: 'TestResource',
            label: 'Test Resource',
            labelPlural: 'Test Resources',
            namespaced: true,
            plural: 'testresources',
            verbs: ['create'],
          },
      false,
      null,
    ],
  };
});

jest.mock('react-redux', () => ({
  ...(jest as any).requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

//const i18nNS = 'public';

 //const mockData = [{"kind":"IntegrationPlatform","apiVersion":"camel.apache.org/v1","metadata":{"creationTimestamp":"2022-03-08T00:56:40Z","generation":1,"labels":{"app":"camel-k"},"managedFields":[{"apiVersion":"camel.apache.org/v1","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:labels":{".":{},"f:app":{}}},"f:spec":{".":{},"f:build":{},"f:kamelet":{},"f:profile":{},"f:resources":{}}},"manager":"Mozilla","operation":"Update","time":"2022-03-08T00:56:40Z"},{"apiVersion":"camel.apache.org/v1","fieldsType":"FieldsV1","fieldsV1":{"f:status":{".":{},"f:build":{".":{},"f:baseImage":{},"f:buildStrategy":{},"f:maven":{".":{},"f:cliOptions":{},"f:localRepository":{}},"f:persistentVolumeClaim":{},"f:publishStrategy":{},"f:runtimeVersion":{},"f:timeout":{}},"f:cluster":{},"f:info":{".":{},"f:gitCommit":{},"f:goOS":{},"f:goVersion":{}},"f:kamelet":{".":{},"f:repositories":{}},"f:phase":{},"f:profile":{},"f:version":{}}},"manager":"kamel","operation":"Update","subresource":"status","time":"2022-03-08T00:56:40Z"}],"name":"camel-k","namespace":"openshift-operators","resourceVersion":"478327","uid":"5065e105-9879-4a07-a930-bddea795784d"},"spec":{"build":{},"kamelet":{},"profile":"Openshift","resources":{}},"status":{"build":{"baseImage":"adoptopenjdk/openjdk11:slim","buildStrategy":"routine","maven":{"cliOptions":["-V","--no-transfer-progress","-Dstyle.color=never"],"localRepository":"/tmp/artifacts/m2"},"persistentVolumeClaim":"camel-k","publishStrategy":"S2I","runtimeVersion":"1.12.0","timeout":"5m0s"},"cluster":"OpenShift","info":{"gitCommit":"c81d73f91eaf400907427e661373ab061ff26ba1","goOS":"linux","goVersion":"go1.16"},"kamelet":{"repositories":[{"uri":"none"}]},"phase":"Ready","profile":"Openshift","version":"1.8.2"}}] 

 describe(ProvidedAPIPage.displayName, () => {
 let wrapper: ReactWrapper<ProvidedAPIPageProps>;



  beforeEach(() => {

    wrapper = mount(<ProvidedAPIPage kind="TestResourceRO" csv={testClusterServiceVersion} namespace="foo" />, {
        wrappingComponent: (props) => (
            <Router history={history}>
       <Provider store={store} {...props} />
          </Router>
    )}
  )
        })

  it('does not allow creation if "create" not included in the verbs for the model',  () => {

    expect(wrapper.find(ListPageHeader).exists()).toBe(true);
    expect(wrapper.find(ListPageCreateLink).exists()).toBe(true);
    expect(wrapper.find(ListPageCreateLink).props().to).toEqual(
        `/k8s/ns/default/${ClusterServiceVersionModel.plural}/testapp/TestResourceRO/~new`,
      );
    expect(wrapper.find(ListPageBody).exists()).toBe(true);
    expect(wrapper.find(ListPageFilter).exists()).toBe(true);
    error("heelo", wrapper.find(ListPageBody).debug())

    
    
  });
  xit('included in the verbs for the model',  () => {

     const csv = _.cloneDeep(testClusterServiceVersion);
   csv.spec.customresourcedefinitions = {};
   wrapper.setProps({ csv });
   wrapper.setProps({ csv });
  });



});
