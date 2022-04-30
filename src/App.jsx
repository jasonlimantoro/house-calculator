import { useEffect, useState } from 'react';
import { Input, Stack, Text, Box, Divider, Select } from '@chakra-ui/react';
import { useFormik } from 'formik';
import './App.css';

const numberFormatter = Intl.NumberFormat('en-US');

const ModeByTargetDuration = 1;
const ModeByTargetMonthlyInstalment = 2;

function App() {
  const formik = useFormik({
    initialValues: {
      width: 0,
      height: 0,
      landCostPerMeterSquared: 0,
      buildingPortion: 0.6,
      buildingCostPerMeterSquared: 5000000,
      numFloors: 1,
      targetMonthDuration: 0,
      targetMonthlyInstalment: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [mode, setMode] = useState(ModeByTargetDuration);

  const {
    width,
    height,
    landCostPerMeterSquared,
    buildingPortion,
    buildingCostPerMeterSquared,
    targetMonthDuration,
    numFloors,
    targetMonthlyInstalment,
  } = formik.values;

  const landArea = width * height;
  const landCost = landArea * landCostPerMeterSquared;

  const buildingArea = buildingPortion * landArea * numFloors;
  const buildingCost = buildingArea * buildingCostPerMeterSquared;

  const totalCost = landCost + buildingCost;
  const monthlyInstalment = totalCost / targetMonthDuration;
  const duration = totalCost / targetMonthlyInstalment;

  useEffect(() => {
    if (mode == ModeByTargetDuration) {
      formik.setFieldValue('targetMonthDuration', Math.round(duration));
    } else if (mode == ModeByTargetMonthlyInstalment) {
      formik.setFieldValue('targetMonthlyInstalment', monthlyInstalment);
    }
  }, [mode]);

  return (
    <div>
      <Text>Mode</Text>
      <Select
        placeholder="Select Mode"
        onChange={(e) => setMode(e.target.value)}
        value={mode}
        marginBottom="3"
      >
        <option value={ModeByTargetDuration}>By Target Duration</option>
        <option value={ModeByTargetMonthlyInstalment}>
          By Target Monthly Instalment
        </option>
      </Select>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold">
              Land
            </Text>
            <Box>
              <label for="width">Width (m)</label>
              <Input
                placeholder="Enter Width"
                size="md"
                name="width"
                onChange={formik.handleChange}
                value={formik.values.width}
              />
            </Box>
            <Box>
              <label for="width">Height (m)</label>
              <Input
                placeholder="Height"
                size="md"
                name="height"
                onChange={formik.handleChange}
                value={formik.values.height}
              />
            </Box>

            <Box>
              <label for="landCostPerMeterSquared">
                Cost/m<sup>2</sup>
              </label>
              <Input
                placeholder="Enter cost"
                name="landCostPerMeterSquared"
                onChange={formik.handleChange}
                value={landCostPerMeterSquared}
              />
            </Box>

            <Text fontSize="lg" fontWeight="bold">
              Building
            </Text>
            <Box>
              <label for="buildingPortion">Portion</label>
              <Input
                placeholder="Enter building portion"
                name="buildingPortion"
                onChange={formik.handleChange}
                value={buildingPortion}
              />
            </Box>
            <Box>
              <label for="buildingCostPerMeterSquared">
                Cost/m<sup>2</sup>
              </label>
              <Input
                placeholder="Enter building cost"
                name="buildingCostPerMeterSquared"
                onChange={formik.handleChange}
                value={buildingCostPerMeterSquared}
              />
            </Box>
            <Box>
              <label for="numFloors">Number of Floors</label>
              <Input
                placeholder="Enter number of floors"
                name="numFloors"
                onChange={formik.handleChange}
                value={numFloors}
              />
            </Box>
            {mode == ModeByTargetDuration ? (
              <Box>
                <label for="targetMonthDuration">Target Duration (month)</label>
                <Input
                  placeholder="Enter target month duration"
                  name="targetMonthDuration"
                  onChange={formik.handleChange}
                  value={targetMonthDuration}
                />
              </Box>
            ) : (
              <Box>
                <label for="targetMonthlyInstalment">
                  Target Monthly Installment
                </label>
                <Input
                  placeholder="Enter target monthly installment"
                  name="targetMonthlyInstalment"
                  onChange={formik.handleChange}
                  value={targetMonthlyInstalment}
                />
              </Box>
            )}
          </Stack>
        </form>
        <Box>
          <Text>
            Land Area: {landArea} m<sup>2</sup>
          </Text>
          <Text>
            Building Area: {buildingArea} m<sup>2</sup>
          </Text>
          <Text>
            Total Cost: {numberFormatter.format(landCost)} +{' '}
            {numberFormatter.format(buildingCost)} ={' '}
            {numberFormatter.format(totalCost)}
          </Text>
          {mode == ModeByTargetDuration ? (
            <Text>
              Installment Per Month: {numberFormatter.format(monthlyInstalment)}{' '}
            </Text>
          ) : (
            <Text>
              Duration: {+duration.toFixed(2)} Month (
              {+(duration / 12).toFixed(2)} Years)
            </Text>
          )}
        </Box>
      </Stack>
    </div>
  );
}

export default App;
