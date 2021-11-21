import * as React from 'react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { PodDisruptionBudgetKind, referenceForModel } from '../../module/k8s';
import { PodDisruptionBudgetModel } from '../../models';
import { useK8sWatchResource } from '../utils/k8s-watch-hook';
import { ResourceLink, DetailsItem } from '../utils';

const AvaiallabilityRequirement: React.FC<AvaiallabilityRequirementProps> = ({
  pdb,
  deployment,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {pdb?.spec?.minAvailable
        ? `${t('public~Min Available')} ${pdb?.spec?.minAvailable}`
        : `${t('public~Max Unavailable')} ${pdb?.spec?.maxUnavailable}`}{' '}
      of {deployment.spec.replicas} {deployment.spec.replicas > 1 ? 'pods' : 'pod'}
    </>
  );
};
export const PodDisruptionBudgetField: React.FC<PodDisruptionBudgetFieldProps> = ({
  deployment,
}) => {
  const { t } = useTranslation();
  const [resources] = useK8sWatchResource<PodDisruptionBudgetKind[]>({
    kind: 'PodDisruptionBudget',
    isList: true,
    namespaced: true,
    namespace: deployment.metadata.namespace,
  });
  const pdb = resources.find((f) =>
    _.isEqual(f.spec.selector.matchLabels, deployment.spec.selector.matchLabels),
  );

  return (
    <dl className="co-m-pane__details">
                <DetailsItem label={t('public~PodDisruptionBudgets')} obj={pdb} path="">
      {!_.isEmpty(pdb) ? (
          <>
          <ResourceLink
            kind='PodDisruptionBudget'
            name={pdb.metadata.name}
            namespace={pdb.metadata.namespace}
          />

            <AvaiallabilityRequirement pdb={pdb} deployment={deployment} />
            </>
          ) : (
            t('public~No PodDisruptionBudgets')
          )
      )}
      </DetailsItem>
    </dl>
  );
};

AvaiallabilityRequirement.displayName = 'AvaiallabilityRequirement';
PodDisruptionBudgetField.displayName = 'PodDisruptionBudgetField';

type AvaiallabilityRequirementProps = {

}
type PodDisruptionBudgetFieldProps = {

}
