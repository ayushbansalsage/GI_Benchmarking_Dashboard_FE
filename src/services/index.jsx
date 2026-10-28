import api from '../api/axios';

export const fetchAllPeers = async (data) => {
    // const queryParams = `ntee_code=${data?.primarySector}${data?.secondarySector}&min_revenue=${Number(data?.minAnnualRevenue)}&max_revenue=${Number(data?.maxAnnualRevenue)}&zipcode=${data?.zipcode}&radius_miles=50`
    const queryParams = `ntee_code=A250&min_revenue=${Number(1)}&max_revenue=${Number(20000000)}&zipcode=${10011}&radius_miles=50`
    const response = await api.get(`/benchmark/${data?.ein}?${queryParams}`);

    return response;
}

export const fetchOrganization = async ({ein}) => {
    const response = await api.get(`/org/${ein}`);

    return response;
}

export const captureUserDetails = async (payload) => {
    const response = await api.post('/capture', payload);

    return response;
}

export const financialResilienceInsightsAPI = async (ein) => {
    const response = await api.get(`/insights/financial-resilience/${ein}`);

    return response;
}
export const fundingMixInsightsAPI = async (ein) => {
    const response = await api.get(`/insights/funding-mix/${ein}`);

    return response;
}
export const operatingProfileInsightsAPI = async (ein) => {
    const response = await api.get(`/insights/operating-profile/${ein}`);

    return response;
}

export const insightsQuestions = async (ein) => {
    const response = await api.get(`/insights/questions/${ein}`);

    return response;
}