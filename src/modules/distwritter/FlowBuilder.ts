import { ConstOutData } from './ConstOutData';

export class FlowBuilder {
  constructor(flowData: ConstOutData.IFlowData) {
    const { record_counter, direction, analyse_currency, original_currency, org_domestic_currency,
      group_domestic_currency, overall_domestic_currency, inner_unit, currency_flow_name,
      currency_flow_code } = flowData;

    this[ConstOutData.FHeaders.h1] = record_counter;
    this[ConstOutData.FHeaders.h2] = direction;
    this[ConstOutData.FHeaders.h3] = analyse_currency;
    this[ConstOutData.FHeaders.h4] = original_currency;
    this[ConstOutData.FHeaders.h5] = org_domestic_currency;
    this[ConstOutData.FHeaders.h6] = group_domestic_currency;
    this[ConstOutData.FHeaders.h7] = overall_domestic_currency;
    this[ConstOutData.FHeaders.h8] = inner_unit;
    this[ConstOutData.FHeaders.h9] = currency_flow_name;
    this[ConstOutData.FHeaders.h10] = currency_flow_code;
  }
  public record_counter: string;
  public direction: string;
  public analyse_currency: string;
  public original_currency: string;
  public org_domestic_currency: string;
  public group_domestic_currency: string;
  public overall_domestic_currency: string;
  public inner_unit: string;
  public currency_flow_name: string;
  public currency_flow_code: string;
}