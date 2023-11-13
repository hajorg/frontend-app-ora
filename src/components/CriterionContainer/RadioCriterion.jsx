import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useShowValidation,
  useCriterionOptionFormFields,
} from 'hooks/assessment';

import messages from './messages';

/**
 * <RadioCriterion />
 */
const RadioCriterion = ({
  criterion,
  criterionIndex,
}) => {
  const { formatMessage } = useIntl();
  const { value, onChange, isInvalid } = useCriterionOptionFormFields(criterionIndex);
  const showValidation = useShowValidation();

  /* for future training validation
  const showTrainingError = assessmentContext.showTrainingError
    && !assessmentContext.checkTrainingSelection({ criterionIndex, optionIndex: selected });
  */

  return (
    <Form.RadioSet name={criterion.name} value={value || ''}>
      {criterion.options.map((option, optionIndex) => (
        <Form.Radio
          className="criteria-option"
          key={option.name}
          value={`${optionIndex}`}
          description={formatMessage(messages.optionPoints, {
            points: option.points,
          })}
          onChange={onChange}
        >
          {option.name}
        </Form.Radio>
      ))}

      {(showValidation && isInvalid) && (
        <Form.Control.Feedback type="invalid" className="feedback-error-msg">
          {formatMessage(messages.rubricSelectedError)}
        </Form.Control.Feedback>
      )}

      {/* for future training validation
        (showTrainingError) && (
          <Form.Control.Feedback type="invalid" className="feedback-error-msg">
            {formatMessage(messages.rubricSelectedError)}
          </Form.Control.Feedback>
        )
      */}
    </Form.RadioSet>
  );
};

const optionPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});
RadioCriterion.propTypes = {
  criterion: PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(optionPropType).isRequired,
  }).isRequired,
  criterionIndex: PropTypes.number.isRequired,
};

export default RadioCriterion;
