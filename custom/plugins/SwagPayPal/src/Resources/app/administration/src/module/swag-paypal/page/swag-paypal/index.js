import template from './swag-paypal.html.twig';
import './swag-paypal.scss';
import constants from './swag-paypal-consts';

const { Component, Defaults } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('swag-paypal', {
    template,

    inject: [
        'SwagPayPalApiCredentialsService',
        'SwagPaypalPaymentMethodService',
        'repositoryFactory',
        'acl',
    ],

    mixins: [
        'notification',
    ],

    data() {
        return {
            isLoading: false,
            isSaveSuccessful: false,
            isTestSuccessful: false,
            isTestSandboxSuccessful: false,
            clientIdFilled: false,
            clientSecretFilled: false,
            clientIdSandboxFilled: false,
            clientSecretSandboxFilled: false,
            sandboxChecked: false,
            salesChannels: [],
            config: {},
            isSetDefaultPaymentSuccessful: false,
            isSettingDefaultPaymentMethods: false,
            savingDisabled: false,
            messageBlankErrorState: null,
            showCredentials: false,
            allowShowCredentials: true,
            ...constants,
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        /**
         * @deprecated tag:v10.0.0 - Will be removed without replacement.
         */
        showSPBCard() {
            if (!this.$refs.configComponent?.allConfigs?.null) {
                return true;
            }

            const merchantLocation = this.config['SwagPayPal.settings.merchantLocation'] ??
                this.$refs.configComponent?.allConfigs?.null['SwagPayPal.settings.merchantLocation'];

            const plusEnabled = this.config['SwagPayPal.settings.plusCheckoutEnabled'] ??
                this.$refs.configComponent?.allConfigs?.null['SwagPayPal.settings.plusCheckoutEnabled'];

            return merchantLocation !== this.MERCHANT_LOCATION_GERMANY || !plusEnabled;
        },

        /**
         * @deprecated tag:v10.0.0 - Will be removed without replacement.
         */
        showPlusCard() {
            return !this.showSPBCard;
        },

        salesChannelRepository() {
            return this.repositoryFactory.create('sales_channel');
        },

        clientIdErrorState() {
            if (this.sandboxChecked || this.clientIdFilled) {
                return null;
            }

            return this.messageBlankErrorState;
        },

        clientSecretErrorState() {
            if (this.sandboxChecked || this.clientSecretFilled) {
                return null;
            }

            return this.messageBlankErrorState;
        },

        clientIdSandboxErrorState() {
            if (!this.sandboxChecked || this.clientIdSandboxFilled) {
                return null;
            }

            return this.messageBlankErrorState;
        },

        clientSecretSandboxErrorState() {
            if (!this.sandboxChecked || this.clientSecretSandboxFilled) {
                return null;
            }

            return this.messageBlankErrorState;
        },

        hasError() {
            return (!this.sandboxChecked && !(this.clientIdFilled && this.clientSecretFilled)) ||
                (this.sandboxChecked && !(this.clientIdSandboxFilled && this.clientSecretSandboxFilled));
        },

        salesChannelCriteria() {
            const criteria = new Criteria(1, 500);
            criteria.addFilter(Criteria.equalsAny('typeId', [
                Defaults.storefrontSalesChannelTypeId,
                Defaults.apiSalesChannelTypeId,
            ]));

            return criteria;
        },

        tab() {
            return this.$route.params.tab || 'general';
        },
    },

    watch: {
        config: {
            handler() {
                const defaultConfig = this.$refs.configComponent?.allConfigs?.null;
                const salesChannelId = this.$refs.configComponent?.selectedSalesChannelId;

                if (salesChannelId === null) {
                    this.clientIdFilled = !!this.config['SwagPayPal.settings.clientId'];
                    this.clientSecretFilled = !!this.config['SwagPayPal.settings.clientSecret'];
                    this.clientIdSandboxFilled = !!this.config['SwagPayPal.settings.clientIdSandbox'];
                    this.clientSecretSandboxFilled = !!this.config['SwagPayPal.settings.clientSecretSandbox'];
                    this.sandboxChecked = !!this.config['SwagPayPal.settings.sandbox'];
                } else {
                    this.clientIdFilled = !!this.config['SwagPayPal.settings.clientId']
                        || !!defaultConfig['SwagPayPal.settings.clientId'];
                    this.clientSecretFilled = !!this.config['SwagPayPal.settings.clientSecret']
                        || !!defaultConfig['SwagPayPal.settings.clientSecret'];
                    this.clientIdSandboxFilled = !!this.config['SwagPayPal.settings.clientIdSandbox']
                        || !!defaultConfig['SwagPayPal.settings.clientIdSandbox'];
                    this.clientSecretSandboxFilled = !!this.config['SwagPayPal.settings.clientSecretSandbox']
                        || !!defaultConfig['SwagPayPal.settings.clientSecretSandbox'];
                    this.sandboxChecked = !!this.config['SwagPayPal.settings.sandbox']
                        || !!defaultConfig['SwagPayPal.settings.sandbox'];
                }
            },
            deep: true,
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (!this.$route.params.tab) {
                this.$router.push({ name: 'swag.paypal.index', params: { tab: 'general' } });
            }

            this.isLoading = true;

            this.salesChannelRepository.search(this.salesChannelCriteria, Shopware.Context.api).then(res => {
                res.add({
                    id: null,
                    translated: {
                        name: this.$tc('sw-sales-channel-switch.labelDefaultOption'),
                    },
                });

                this.salesChannels = res;
            }).finally(() => {
                this.isLoading = false;
            });

            this.messageBlankErrorState = {
                code: 1,
                detail: this.$tc('swag-paypal.messageNotBlank'),
            };
        },

        onSave() {
            if (this.hasError) {
                return;
            }

            this.save();
        },

        onChangeLoading(state) {
            this.isLoading = state;
        },

        save() {
            this.isLoading = true;

            this.$refs.configComponent.save().then((response) => {
                this.isSaveSuccessful = true;

                if (response.payPalWebhookErrors) {
                    const errorMessage = this.$tc('swag-paypal.settingForm.messageWebhookError');
                    response.payPalWebhookErrors.forEach((error) => {
                        this.createNotificationError({
                            message: `${errorMessage}<br><br><ul><li>${error}</li></ul>`,
                        });
                    });
                }
            }).finally(() => {
                this.isLoading = false;
            });
        },

        onSetPaymentMethodDefault() {
            this.isSettingDefaultPaymentMethods = true;

            this.SwagPaypalPaymentMethodService.setDefaultPaymentForSalesChannel(
                this.$refs.configComponent?.selectedSalesChannelId,
            ).then(() => {
                this.isSettingDefaultPaymentMethods = false;
                this.isSetDefaultPaymentSuccessful = true;
            });
        },

        preventSave(mode) {
            if (!mode) {
                this.savingDisabled = false;
                return;
            }

            this.savingDisabled = true;
        },

        onChangeCredentialsVisibility(visibility) {
            this.showCredentials = visibility;
        },
    },
});
