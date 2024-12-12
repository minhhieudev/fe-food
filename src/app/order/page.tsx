"use client";
import { PaymentActions } from "@/modules/payment/slice";
import {
  ServiceGroupActions,
  ServiceGroupSelectors,
} from "@/modules/services.group/slice";
import { ServiceOrderActions } from "@/modules/services.order/slice";
import {
  ServicePackageActions,
  ServicePackageSelectors,
} from "@/modules/services.package/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Switch } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DropDownCustom from "../components/DropDownCustom";
import DropDownPlatform from "../components/DropDownPlatform";
import DropDownServices from "../components/DropDownServices";
import TextInput from "../components/InputText";
import Search from "../components/MainScreen/Search";
import { formatPriceVND, validateForm } from "../utils/units";
import { Language } from "../utils/language/language";
import * as yup from "yup";
import { useAppSelector } from "@/core/services/hook";
import { CurrencySelector } from "@/modules/currency/slice";
import { useSearchParams } from "next/navigation";
import { Platform } from "./ultis";
import { toast } from "react-toastify";
import ShowTitle from "../components/ShowTitle";
import GenerationComments from "./components/GenerationComments";
import CheckEmptyInput from "./components/CheckEmptyInput";
import { useTranslate } from "@/core/hooks/useTranslateData";
import { calculatePriceCustom } from "../utils/objectUtils";
import { cloneDeep } from "lodash";
type Order = {
  qty: number;
  intervalTime?: number;
};

const defaultOrderform: Order = {
  qty: 0,
  intervalTime: 0,
};
export default function Order() {
  const lang = new Language(window);
  const currency = useAppSelector(CurrencySelector.currency);
  const searchParams = useSearchParams();
  const [servicePackage, setServicePackage] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [idSearch, setIDSearch] = useState<any>(
    searchParams.get("_id") || null
  );
  const [codeSearch, setCodeSearch] = useState();
  const [serviceGroupSearch, setServiceGroupSearch] = useState<any>();
  const { getServiceName } = useTranslate(window);

  useEffect(() => {
    setIDSearch(searchParams.get("_id"));
  }, [searchParams]);

  const validateForm = yup.object({
    qty: yup
      .number()
      .integer("Số lượng không là số thập phân")
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .required(lang.gen("order.canNotBeBlank"))
      .notOneOf([0], lang.gen("order.larger0")),
    customerEnteredValues: yup.array(
      yup.object({
        attributeCode: yup.string().required(),
        enteredValue: yup.string().required(),
      })
    ),
    intervalTime: yup.number(),
  });
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
    resetField,
  } = useForm<Order>({
    mode: "onChange",
    defaultValues: defaultOrderform,
    resolver: yupResolver(validateForm),
  });

  const dispatch = useDispatch();
  const dataServiceGroup: any = useSelector(ServiceGroupSelectors.serviceGroup);
  const dataServices: any = useSelector(ServicePackageSelectors.servicePackage);

  const [service, setService] = useState();
  const [attributes, setAttributes] = useState<any>();

  const [_id, setId] = useState();
  const [iconPlatform, setIconPlatform] = useState();
  const [price, setPrice] = useState<number>(1);
  const [title, setTitle] = useState();
  const [empty, setEmpty] = useState(false);
  const [des, setDes] = useState<any>();
  const [dataDrop, setDataDrop] = useState();
  //pick platform
  useEffect(() => {
    dispatch(ServiceGroupActions.getServiceGroups({}));
    dispatch(
      ServicePackageActions.getServicePackage({
        onSuccess: (rs: any) => {
          if (rs.success == true && idSearch) {
            rs.data?.servicePackages?.map((item: any) => {
              if (item?._id === idSearch) {
                setServiceGroupSearch(item.serviceGroup._id);
                setCodeSearch(item.scriptGroupCode);
                dispatch(
                  ServicePackageActions.getServicePackagePick({
                    platform: item.scriptGroupCode,
                    id: item.serviceGroup._id,
                    onSuccess: (rsx: any) => {
                      if (rsx.success == true) {
                        setDataDrop(rsx.data.servicePackages);
                      }
                    },
                  })
                );
                Platform.map((itemS: any) => {
                  if (itemS.code == item?.scriptGroupCode) {
                    setIconPlatform(itemS.iconLarge);
                  }
                });
              }
            });
          }
          if (rs.success == true && idSearch == null) {
            rs.data?.servicePackages?.map((item: any) => {
              if (item?._id !== idSearch) {
                setServiceGroupSearch(
                  rs.data?.servicePackages[0]?.serviceGroup?._id
                );
                setCodeSearch(rs.data?.servicePackages[0]?.scriptGroupCode);
                dispatch(
                  ServicePackageActions.getServicePackagePick({
                    platform: rs.data?.servicePackages[0]?.scriptGroupCode,
                    id: rs.data?.servicePackages[0]?.serviceGroup?._id,
                    onSuccess: (rsx: any) => {
                      if (rsx.success == true) {
                        setDataDrop(rsx.data.servicePackages);
                      }
                    },
                  })
                );

                Platform.map((itemS: any) => {
                  if (
                    itemS.code == rs.data?.servicePackages[0]?.scriptGroupCode
                  ) {
                    setIconPlatform(itemS.iconLarge);
                  }
                });
              }
            });
          }
        },
      })
    );
  }, [idSearch]);

  const [checkService, setCheckService] = useState(true);

  const handleCheckPlatform = (e: any) => {
    setCheckService(true);
    dispatch(
      ServicePackageActions.getServicePackagePick({
        platform: e.code,
        id: service || serviceGroupSearch,
        onSuccess: (rs: any) => {
          setIDSearch(rs.data.servicePackages[0]._id);
          setCodeSearch(e?.code);
        },
        onFail: (error: any) => {
          setIDSearch(e?.code);
          setCodeSearch(e?.code);
          setCheckService(false);
        },
      })
    );
  };
  const handlePick = (e: any) => {
    setCheckService(true);
    setServiceGroupSearch(e);
    dispatch(
      ServicePackageActions.getServicePackagePick({
        platform: codeSearch,
        id: e,
        onSuccess: (rs: any) => {
          setIDSearch(rs.data.servicePackages[0]._id);
        },
        onFail: (error: any) => {
          setCheckService(false);
        },
      })
    );
  };
  const handlesetAttributes = (e: any) => {
    setServicePackage(e);
    setPrice(e?.price);
    setAttributes(e?.attributes);
    setId(e?._id);
    setTitle(e?.serviceCode ? getServiceName(e.serviceCode) : e?.name);
    setDes(e?.description);
  };

  const [dataAtt, setDataAtt] = useState<any>([]);

  const priceDisplay = useMemo(() => {
    if (!servicePackage) return price

    if (servicePackage.customPrice) {
      return calculatePriceCustom(dataAtt, servicePackage) || servicePackage.price || price;
    } else {
      return servicePackage.price || price
    }
  }, [servicePackage, dataAtt, price])

  useEffect(() => {
    setDataAtt(
      (attributes || []).map((x: any) => {
        return {
          attributeCode: x.code,
          enteredValue: "",
        };
      })
    );
  }, [attributes]);

  const onChangeAttributes = useCallback(
    ({ item, data }: { item: any; data: any }) => {
      setDataAtt(
        (dataAtt || []).map((x: any) => {
          if (x.attributeCode == item.code) {
            return {
              attributeCode: item.code,
              enteredValue: data,
            };
          } else {
            return x;
          }
        })
      );
    },
    [attributes, dataAtt]
  );
  const [dataCheckVali, setDataCheckVali] = useState<any>();
  const onSubmit: SubmitHandler<Order> = useCallback(
    (data) => {
      setDataCheckVali([]);
      let dataCheck = [];
      dataAtt?.map((item: any) => {
        if (item?.enteredValue === "") {
          setEmpty(true);
          dataCheck.push({ ...item, check: true });
          setDataCheckVali(dataCheck);
        } else {
          dataCheck.push({ ...item, check: false });
          setDataCheckVali(dataCheck);
        }
      });
      if (checkService === true) {
        if (attributes?.length > 0) {
          attributes?.map((item: any) => {
            if (item?.required === true) {
              dataAtt?.map((itemAtt: any) => {
                if (
                  itemAtt?.enteredValue == "" &&
                  item?.code === itemAtt?.attributeCode
                ) {
                  setEmpty(true);
                } else if (itemAtt?.enteredValue) {
                  setEmpty(false);
                  let body = {
                    serviceID: _id,
                    qty: data?.qty,
                    customerEnteredValues: dataAtt,
                    comments: comments.split("|"),
                  };
                  dispatch(
                    ServiceOrderActions.order({
                      body,
                      onSuccess: () => {
                        reset();
                        dispatch(PaymentActions.getWallet({}));
                        setDataAtt(
                          (attributes || []).map((x: any) => {
                            return {
                              attributeCode: x.code,
                              enteredValue: "",
                            };
                          })
                        );
                      },
                    })
                  );
                }
              });
            } else {
              let body = {
                serviceID: _id,
                qty: data?.qty,
                customerEnteredValues: dataAtt,
                comments: comments.split("|"),
              };
              dispatch(
                ServiceOrderActions.order({
                  body,
                  onSuccess: () => {
                    reset();
                    dispatch(PaymentActions.getWallet({}));
                    setDataAtt(
                      (attributes || []).map((x: any) => {
                        return {
                          attributeCode: x.code,
                          enteredValue: "",
                        };
                      })
                    );
                  },
                })
              );
            }
          });
        } else {
          let body = {
            serviceID: _id,
            qty: data?.qty,
            comments: comments.split("|"),
          };
          dispatch(
            ServiceOrderActions.order({
              body,
              onSuccess: () => {
                reset();
                dispatch(PaymentActions.getWallet({}));
                setDataAtt(
                  (attributes || []).map((x: any) => {
                    return {
                      attributeCode: x.code,
                      enteredValue: "",
                    };
                  })
                );
              },
            })
          );
        }
      }
    },
    [attributes, dataAtt]
  );

  const [search, setSearch] = useState();
  const handleChangeSearch = (e: any) => {
    if (e.length == 0) {
      setDataSearch("");
    } else {
      setSearch(e);
    }
  };
  const [dataSearch, setDataSearch] = useState<any>();
  const handleSearch = () => {
    dispatch(
      ServicePackageActions.getSearch({
        search: search,
        onSuccess: (rs: any) => {
          setDataSearch(rs);
        },
      })
    );
  };
  const [dataReSearch, setDataResearch] = useState();
  const handleSetDataSearch = (data: any) => {
    dispatch(
      ServicePackageActions.getServicePackage({
        platform: data?.scriptGroupCode,
        id: data?.serviceGroup?._id,
        onSuccess: (rs: any) => {
          if (rs.success == true) {
            setDataDrop(rs.data?.servicePackages);
          }
        },
      })
    );
    setCodeSearch(data?.scriptGroupCode);
    setServiceGroupSearch(data?.serviceGroup?._id);
    setService(data?.serviceGroup?._id);
    setDataResearch(data);
    setIDSearch(data?._id);
    Platform.map((item: any) => {
      if (item.code == data?.scriptGroupCode) {
        setIconPlatform(item.iconLarge);
      }
    });
  };
  const [platform, setPlatform] = useState();
  const handleSetPlatform = (e: any) => {
    setPlatform(e);
  };

  const renderLabel = useCallback((item: any) => {
    return (
      <span className="flex">
        {item?.label}
        {item?.required == true && <span className="text-[red]">*</span>}
      </span>
    );
  }, []);

  const getSelectedValue = useCallback(
    (item: any) => {
      const itemSelected = dataAtt.find(
        (attribute: any) => attribute.attributeCode === item.code
      );
      return itemSelected?.enteredValue || "";
    },
    [dataAtt]
  );

  const getDataSelectOptions = useCallback((item:any) => {
    return item.options.map((option: any) => {
      const customerEnteredValuesTemp = cloneDeep(dataAtt)
      const findIndex = customerEnteredValuesTemp.findIndex((customerEnteredValue: any) => customerEnteredValue.attributeCode === item.code)
      if (findIndex > -1) {
        customerEnteredValuesTemp[findIndex].enteredValue = option.value
      } else {
        customerEnteredValuesTemp.push({attributeCode: item.code, enteredValue: option.value})
      }
      const newPrice = calculatePriceCustom(customerEnteredValuesTemp, servicePackage);
      
      return {
        ...option,
        _id: option.value,
        name: `${option.label} - ${parseFloat((newPrice * Number(currency.exchangeRate)).toFixed(4))} ${currency.code}`,
      }
    })
  }, [dataAtt, servicePackage, currency])
  
  const handleSelectServicePackage = (e:any) => {
    handlesetAttributes(e);
    
    if (e && e.minValue) {
      defaultOrderform.qty = e.minValue;
      reset(defaultOrderform);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShowTitle title={lang.gen("menu.order")} />
        <div className="max-lg:hidden flex w-[100%] p-[20px] gap-[20px]">
          <div className="flex rounded-[12px] border-2 flex-col p-[24px] shadow-gray-300 border-solid border-[#FFBD70] shadow-lg gap-6 w-[70%]">
            <Search
              data={dataSearch && dataSearch?.data?.servicePackages}
              title={lang.gen("order.searchService")}
              handleSearch={handleSearch}
              handleChangeSearch={handleChangeSearch}
              handleSetData={handleSetDataSearch}
            />
            <div className="flex gap-[16px] w-full">
              <div className="w-[30%]">
                <DropDownPlatform
                  code={idSearch}
                  dataDrop={
                    dataServices?.servicesPackage?.data?.servicePackages
                  }
                  title={lang.gen("order.platform")}
                  width={300}
                  handleCheckPlatform={handleCheckPlatform}
                  setPlatform={handleSetPlatform}
                />
              </div>
              <div className="flex w-[90%]">
                <DropDownCustom
                  handlePick={handlePick}
                  dataDrop={dataServiceGroup}
                  title={lang.gen("order.classify")}
                  id={serviceGroupSearch}
                />
              </div>
            </div>
            {dataDrop && (
              <DropDownServices
                title={lang.gen("order.service")}
                setAttributes={(e) => handleSelectServicePackage(e)}
                id={idSearch ? idSearch : null}
                checkService={checkService}
                dataDrop={dataDrop}
              />
            )}

            {dataServices?.servicesPackage?.data?.servicePackages.length >
              0 && (
              <>
                {attributes?.length > 0 && (
                  <div className="flex flex-col border-2 rounded-[12px] border-solid border-[#FFBD70] p-[24px] gap-[20px] ">
                    {attributes?.map((item: any, index: number) => {
                      if (item.dataType === "select") {
                        return (
                          <div key={index}>
                            <div className="flex w-full">
                              <DropDownCustom
                                handlePick={(value: string) => {
                                  onChangeAttributes({
                                    item: item,
                                    data: value,
                                  });
                                }}
                                dataDrop={{
                                  serviceGroups: getDataSelectOptions(item),
                                }}
                                title={renderLabel(item)}
                                id={getSelectedValue(item)}
                                placeholder={`Chọn ${item?.label?.toLowerCase()}`}
                              />
                            </div>
                            <CheckEmptyInput
                              checkEmpty={empty}
                              data={dataAtt}
                              itemCheck={item}
                              dataCheck={dataCheckVali}
                            />
                          </div>
                        );
                      }
                      return (
                        <div key={index}>
                          {renderLabel(item)}
                          <TextInput
                            placeholder={`${lang.gen("order.enter")} ${
                              item?.label
                            }`}
                            type={item?.dataType}
                            onChange={(
                              e: React.FormEvent<HTMLInputElement>
                            ) => {
                              onChangeAttributes({
                                item: item,
                                data: e?.currentTarget?.value,
                              });
                            }}
                            search={(() => {
                              try {
                                return dataAtt?.filter((itemAtt: any) => {
                                  return item?.code === itemAtt?.attributeCode;
                                })[0].enteredValue;
                              } catch (error) {
                                return "";
                              }
                            })()}
                          />
                          <CheckEmptyInput
                            checkEmpty={empty}
                            data={dataAtt}
                            itemCheck={item}
                            dataCheck={dataCheckVali}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {(attributes || []).filter((x: any) => x?.commentType).length >
            0 ? (
              <GenerationComments
                setComments={setComments}
                comments={comments}
                data={(() => {
                  try {
                    return attributes
                      .filter((x: any) => x.commentType)
                      .map((x: any) => {
                        const currentAtt = dataAtt.filter((y: any) => {
                          return x.code === y.attributeCode;
                        });
                        return {
                          ...currentAtt[0],
                          ...x,
                        };
                      })[0].enteredValue;
                  } catch (error) {
                    return "";
                  }
                })()}
              />
            ) : (
              <></>
            )}
            <div className="flex gap-1">
              <div className="flex gap-1 flex-col w-full">
                <p>{lang.gen("order.inputQuantity")}</p>
                <div className="fex flex-row">
                  <Controller
                    name="qty"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3 w-full">
                        <div className="w-full flex flex-col gap-1">
                          <TextInput
                            {...field}
                            placeholder={lang.gen("order.inputQuantity")}
                            type="number"
                            required
                            search={field.value}
                            errorMessage={errors?.qty?.message}
                          />
                          <div className="flex gap-2">
                            {dataServices?.servicesPackage?.data?.servicePackages.map(
                              (item: any, index: number) => {
                                if (item?.minValue && _id == item?._id) {
                                  return (
                                    <div className="flex gap-2" key={index}>
                                      <p className="text-[#FF8900]">
                                        {lang.gen("order.minimum")}
                                      </p>
                                      <p>{item.minValue}</p>
                                    </div>
                                  );
                                }
                              }
                            )}
                            {dataServices?.servicesPackage?.data?.servicePackages.map(
                              (item: any, index: number) => {
                                if (item?.maxValue && _id == item?._id) {
                                  return (
                                    <div className="flex gap-2" key={index}>
                                      <p className="text-[#FF8900]">
                                        {lang.gen("order.maximum")}
                                      </p>
                                      <p>{item.maxValue}</p>
                                    </div>
                                  );
                                }
                              }
                            )}
                          </div>
                        </div>
                        <div className="border-1 border-gray-300 rounded-[4px] min-w-[200px] justify-center items-center flex text-[#72777A] h-[40px]">
                          {formatPriceVND(
                            Math.floor(Number(
                              (
                                Number(field.value * priceDisplay) *
                                Number(currency.exchangeRate)
                              ).toFixed(10)
                            )
                          ))}{" "}
                          {currency.code}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              className="rounded-[4px] bg-[#FF8900] text-[#fff]"
              onClick={handleSubmit(onSubmit)}
            >
              {lang.gen("order.buttonOrder")}
            </Button>
          </div>
          <div className=" w-[30%] gap-[24px]">
            <div className="flex border-1 shadow-gray-300 gap-3 mb-[20px] border-solid shadow-lg rounded-[12px] text-[16px] justify-center items-center p-[12px] ">
              <div className="flex">{iconPlatform ? iconPlatform : ""}</div>
              <p>{title}</p>
            </div>
            {des && (
              <div className="flex border-1 shadow-gray-300 border-solid shadow-lg rounded-[12px] text-[16px] justify-center items-center p-[24px] flex-col gap-[20px]">
                <div
                  dangerouslySetInnerHTML={{ __html: des }}
                  className="w-full "
                />
              </div>
            )}
          </div>
        </div>
      </form>

      {/* ---------------------------------- RESPONSIVE ---------------------------------- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hidden max-lg:flex p-[24px] gap-[20px] flex-col">
          <Search
            data={dataSearch && dataSearch?.data?.servicePackages}
            title={lang.gen("order.searchService")}
            handleSearch={handleSearch}
            handleChangeSearch={handleChangeSearch}
            handleSetData={handleSetDataSearch}
          />
          <div className="flex gap-[16px] w-full">
            <DropDownPlatform
              code={idSearch}
              dataDrop={dataServices?.servicesPackage?.data?.servicePackages}
              title={lang.gen("order.platform")}
              handleCheckPlatform={handleCheckPlatform}
              setPlatform={handleSetPlatform}
            />
            <DropDownCustom
              handlePick={handlePick}
              dataDrop={dataServiceGroup}
              title={lang.gen("order.classify")}
              id={serviceGroupSearch}
            />
          </div>
          {dataDrop && (
            <DropDownServices
              title={lang.gen("order.service")}
              setAttributes={handlesetAttributes}
              id={idSearch ? idSearch : null}
              checkService={checkService}
              dataDrop={dataDrop}
            />
          )}
          {dataServices?.servicesPackage?.data?.servicePackages.length > 0 && (
            <>
              {attributes?.length > 0 && (
                <div className="flex flex-col border-1 rounded-[4px] border-gray-200 p-[24px] gap-[20px]">
                  {attributes?.map((item: any, index: number) => {
                    if (item.dataType === "select") {
                      return (
                        <div key={index}>
                          <div className="flex w-full">
                            <DropDownCustom
                              handlePick={(value: string) => {
                                onChangeAttributes({
                                  item: item,
                                  data: value,
                                });
                              }}
                              dataDrop={{
                                serviceGroups: getDataSelectOptions(item),
                              }}
                              title={renderLabel(item)}
                              id={getSelectedValue(item)}
                              placeholder={`Chọn ${item.label?.toLowerCase()}`} 
                            />
                          </div>
                          <CheckEmptyInput
                            checkEmpty={empty}
                            data={dataAtt}
                            itemCheck={item}
                            dataCheck={dataCheckVali}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        {renderLabel(item)}
                        <TextInput
                          placeholder={`${lang.gen("order.enter")} ${
                            item?.label
                          }`}
                          type={item?.dataType}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            onChangeAttributes({
                              item: item,
                              data: e?.currentTarget?.value,
                            });
                          }}
                          search={(() => {
                            try {
                              return dataAtt?.filter((itemAtt: any) => {
                                return item?.code === itemAtt?.attributeCode;
                              })[0].enteredValue;
                            } catch (error) {
                              return "";
                            }
                          })()}
                        />
                        <CheckEmptyInput
                          checkEmpty={empty}
                          data={dataAtt}
                          itemCheck={item}
                          dataCheck={dataCheckVali}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {(attributes || []).filter((x: any) => x?.commentType).length > 0 ? (
            <GenerationComments
              setComments={setComments}
              comments={comments}
              data={(() => {
                try {
                  return attributes
                    .filter((x: any) => x.commentType)
                    .map((x: any) => {
                      const currentAtt = dataAtt.filter((y: any) => {
                        return x.code === y.attributeCode;
                      });
                      return {
                        ...currentAtt[0],
                        ...x,
                      };
                    })[0].enteredValue;
                } catch (error) {
                  return "";
                }
              })()}
            />
          ) : (
            <></>
          )}
          <div className="flex gap-1">
            <div className="flex gap-1 flex-col w-full">
              <div className="flex">
                <p>{lang.gen("order.inputQuantity")}</p>
                <span className="text-[red]"> *</span>
              </div>
              <div className="fex flex-row">
                <Controller
                  name="qty"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex gap-3 w-full flex-col">
                        <div className="w-full flex gap-1">
                          <TextInput
                            {...field}
                            placeholder={lang.gen("order.inputQuantity")}
                            type="number"
                            required
                            errorMessage={errors?.qty?.message}
                          />
                          <div className="border-1 border-gray-300 rounded-[4px] min-w-[100px] justify-center items-center flex text-[#72777A] h-[40px]">
                            {formatPriceVND(
                              Number(
                                (
                                  Number(field.value * priceDisplay) *
                                  Number(currency.exchangeRate)
                                ).toFixed(10)
                              )
                            )}{" "}
                            {currency.code}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {dataServices?.servicesPackage?.data?.servicePackages.map(
                            (item: any, index: number) => {
                              if (item?.minValue && _id == item?._id) {
                                return (
                                  <div className="flex gap-2" key={index}>
                                    <p className="text-[#FF8900]">
                                      {lang.gen("order.minimum")}
                                    </p>
                                    <p>{item.minValue}</p>
                                  </div>
                                );
                              }
                            }
                          )}
                          {dataServices?.servicesPackage?.data?.servicePackages.map(
                            (item: any, index: number) => {
                              if (item?.maxValue && _id == item?._id) {
                                return (
                                  <div className="flex gap-2" key={index}>
                                    <p className="text-[#FF8900]">
                                      {lang.gen("order.maximum")}
                                    </p>
                                    <p>{item.maxValue}</p>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <Button
            className="rounded-[4px] bg-[#FF8900] text-[#fff]"
            onClick={handleSubmit(onSubmit)}
          >
            Đặt hàng
          </Button>
          <div className=" w-full gap-[24px] flex flex-col h-[100%]">
            <div className="flex border-1 rounded-[12px] text-[16px] justify-center items-center p-[12px] gap-3 border-[#FF8900]">
              <div className="flex">{iconPlatform}</div>
              <p>{title}</p>
            </div>
            {des && (
              <div className="flex border-1 shadow-gray-300 border-solid shadow-lg rounded-[12px] text-[16px] justify-center items-center p-[24px] flex-col gap-[20px]">
                <div
                  dangerouslySetInnerHTML={{ __html: des }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
