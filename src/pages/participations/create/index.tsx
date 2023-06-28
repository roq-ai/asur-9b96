import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createParticipation } from 'apiSdk/participations';
import { Error } from 'components/error';
import { participationValidationSchema } from 'validationSchema/participations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { SessionInterface } from 'interfaces/session';
import { getUsers } from 'apiSdk/users';
import { getSessions } from 'apiSdk/sessions';
import { ParticipationInterface } from 'interfaces/participation';

function ParticipationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ParticipationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createParticipation(values);
      resetForm();
      router.push('/participations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ParticipationInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      session_id: (router.query.session_id as string) ?? null,
    },
    validationSchema: participationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Participation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<SessionInterface>
            formik={formik}
            name={'session_id'}
            label={'Select Session'}
            placeholder={'Select Session'}
            fetcher={getSessions}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'participation',
  operation: AccessOperationEnum.CREATE,
})(ParticipationCreatePage);
