package pdb

import (
	"context"

	// k8s
	coreinformersv1 "k8s.io/client-go/informers/core/v1"

	// openshift
	operatorclientv1 "github.com/openshift/client-go/operator/clientset/versioned/typed/operator/v1"
	"github.com/openshift/library-go/pkg/operator/v1helpers"
	"github.com/openshift/library-go/pkg/controller/factory"

	// console-operator
	"github.com/openshift/console-operator/pkg/api"
	"github.com/openshift/console-operator/pkg/console/controllers/util"
)

type PodDiscruptionController {
	operatorClient	xlhelps.operatorClient
	operatorConfigClient	operatorclientv1.ConsoleInterface	
	pdbClient	coreInformer.PodDisruptionBudgetInformer	
}

func NewPodDiscruptionBudget (	
	operatorClient v1helpers.OperatorClient,
	operatorConfigClient operatorclientv1.ConsoleInterface,) 
	factory.Controller{
		
		ctrl := &PodDiscruptionCcontroller{
			operatorClient:       operatorClient,
			operatorConfigClient: operatorConfigClient,
		}
	   
		configMapInformer := coreInformer.ConfigMaps()


	return factory.New().
	WithFilteredEventsInformers( 
		util.IncludeNamesFilter(api.TrustedCAConfigMapName, api.OAuthServingCertConfigMapName),
		configMapInformer.Informer(),
	).WithFilteredEventsInformers( 
	util.IncludeNamesFilter(api.OpenShiftConsoleRouteName, api.OpenshiftConsoleCustomRouteName),
	pdbClient.Informer(),
).ResyncEvery(30*time.Second).WithSync(ctrl.Sync).
	ToController("PodDiscruptionController", recorder.WithComponentSuffix("pdb-controller"))
}

func(c *PodDiscruptionController) Sync(ctx context.Context, controllerContext factory.SyncContext) error {
	
}
