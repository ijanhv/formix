"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ImageSelector from "../image-selector";
import ThemeSelector from "../theme/theme-selector";
import { formSchema, FormType } from "@/schema/zod";

const slideTypes = [
  { label: "Short Text", value: "short_text" },
  { label: "Long Text", value: "long_text" },
  { label: "Multiple Choice", value: "multiple_choice" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Date", value: "date" },
  { label: "Rating", value: "rating" },
  { label: "Boolean", value: "boolean" },
  { label: "Email", value: "email" },
  { label: "Website", value: "website" },
  { label: "File Upload", value: "file_upload" },
  { label: "Number", value: "number" },
  { label: "Opinion Scale", value: "opinion_scale" },
  { label: "Picture Choice", value: "picture_choice" },
];

const fonts = [
  { id: "font-jost", name: "Jost" },
  { id: "font-quick", name: "Quick" },
  { id: "font-serifDisplay", name: "DM Serif Display" },
  { id: "font-poppins", name: "Poppins" },
];

interface RightSidebarProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: FormType) => void;
  currentSlideIndex: number;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  form,
  onSubmit,
  currentSlideIndex,
}) => {
  const slides = form.watch("screens");

  if (slides?.length === 0) {
    return (
      <div className="border-l p-4">
        <p>No slides available</p>
      </div>
    );
  }

  return (
    <div className="h-full hidden md:block bg-foreground/5">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border-l bg-background h-full overflow-y-auto scrollbar scrollbar-w-0"
      >
        <div className="space-y-4">
          <Tabs defaultValue="content" className="">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="content">
                Content
              </TabsTrigger>
              <TabsTrigger className="w-full" value="theme">
                Theme
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="flex flex-col gap-4 w-full">
              {slides?.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    display: index === currentSlideIndex ? "block" : "none",
                  }}
                >
                  {/* Slide Type */}
                  <FormField
                    control={form.control}
                    name={`screens.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Slide Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const newType = value;
                            field.onChange(newType);
                            if (
                              newType === "multiple_choice" ||
                              newType === "dropdown"
                            ) {
                              // Ensure you access slide with a correct type
                              const currentSlide = form.getValues(
                                `screens.${index}`
                              );

                              if (
                                "options" in currentSlide &&
                                (!currentSlide.options ||
                                  currentSlide.options.length === 0)
                              ) {
                                form.setValue(`screens.${index}.options`, [
                                  {
                                    value: "option_1",
                                    label: "Option 1",
                                  },
                                ]);
                              }
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select slide type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {slideTypes.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* Slide Label */}
                  <FormField
                    control={form.control}
                    defaultValue={form.watch(`screens.${index}.title`)}
                    name={`screens.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slide Label</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter slide label" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Slide Description */}
                  <FormField
                    control={form.control}
                    name={`screens.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slide Description</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter slide description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Selector */}
                  <FormField
                    control={form.control}
                    name={`screens.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose an Image</FormLabel>
                        <FormControl>
                          <ImageSelector
                            onClick={(value) => {
                              if (form.watch(`screens.${index}.image`)) {
                                form.setValue(`screens.${index}.image`, "");
                              } else {
                                form.setValue(field.name, value, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                  shouldValidate: true,
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Required Switch */}
                  {slide?.type !== "welcomeScreen" &&
                    slide?.type !== "endScreen" && (
                      <FormField
                        control={form.control}
                        name={`screens.${index}.required`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Required</FormLabel>
                              <FormDescription>
                                Make this slide required
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                  {slide?.type === "rating" && (
                    <FormField
                      control={form.control}
                      name={`screens.${index}.scale`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between rounded-lg  ">
                          <div className="space-y-0.5">
                            <FormLabel>Scale</FormLabel>
                            <FormDescription></FormDescription>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder=" Enter the max value of the scale"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  {slide?.type === "multiple_choice" && (
                    <div className="space-y-2">
                      <FormLabel>Options</FormLabel>
                      {slide.options?.map((option, optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`screens.${index}.options.${optionIndex}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const generatedValue = value
                                      .toLowerCase()
                                      .replace(/\s+/g, "_");

                                    field.onChange(value);
                                    const currentOptions =
                                      form.getValues(
                                        `screens.${index}.options`
                                      ) || [];

                                    const updatedOptions = currentOptions.map(
                                      (opt, idx) =>
                                        idx === optionIndex
                                          ? {
                                              ...opt,
                                              label: value,
                                              value: generatedValue,
                                            }
                                          : opt
                                    );

                                    form.setValue(
                                      `screens.${index}.options`,
                                      // @ts-ignore
                                      updatedOptions
                                    ); // Set updated options in form state
                                  }}
                                  value={field.value || ""} // Use empty string as fallback
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const currentOptions =
                            form.getValues(`screens.${index}.options`) || [];
                          const newOptionIndex = currentOptions.length + 1;
                          const newOptionLabel = `Option ${newOptionIndex}`; // Default label
                          // @ts-ignore
                          form.setValue(`screens.${index}.options`, [
                            ...currentOptions,
                            {
                              label: newOptionLabel,
                              value: newOptionLabel
                                .toLowerCase()
                                .replace(/\s+/g, "_"), // Generate value from label
                            },
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}

                  {slide?.type === "dropdown" && (
                    <div className="space-y-2">
                      <FormLabel>Options</FormLabel>
                      {slide.options?.map((option, optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`screens.${index}.options.${optionIndex}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const generatedValue = value
                                      .toLowerCase()
                                      .replace(/\s+/g, "_");

                                    field.onChange(value);
                                    const currentOptions =
                                      form.getValues(
                                        `screens.${index}.options`
                                      ) || [];

                                    const updatedOptions = currentOptions.map(
                                      (opt, idx) =>
                                        idx === optionIndex
                                          ? {
                                              ...opt,
                                              label: value,
                                              value: generatedValue,
                                            }
                                          : opt
                                    );

                                    form.setValue(
                                      `screens.${index}.options`,
                                      // @ts-ignore
                                      updatedOptions
                                    ); // Set updated options in form state
                                  }}
                                  value={field.value || ""} // Use empty string as fallback
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const currentOptions =
                            form.getValues(`screens.${index}.options`) || [];
                          const newOptionIndex = currentOptions.length + 1;
                          const newOptionLabel = `Option ${newOptionIndex}`; // Default label
                          // @ts-ignore
                          form.setValue(`screens.${index}.options`, [
                            ...currentOptions,
                            {
                              label: newOptionLabel,
                              value: newOptionLabel
                                .toLowerCase()
                                .replace(/\s+/g, "_"), // Generate value from label
                            },
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}

                  {/* Options for select/multiSelect */}
                  {/* {(slide.type === "multiple_choice" ||
                    slide.type === "multiple_choice") && (
                    <div className="space-y-2">
                      <FormLabel>Options</FormLabel>
                      {slide.options?.map((_, optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`slides.${index}.options.${optionIndex}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    field.onChange(
                                      value || `Option ${optionIndex + 1}`
                                    )
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const currentOptions =
                            form.getValues(`slides.${index}.options`) || []
                          const newOptionIndex = currentOptions.length + 1
                          form.setValue(`slides.${index}.options`, [
                            ...currentOptions,
                            `Option ${newOptionIndex}`,
                          ])
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  )} */}

                  {/* {slide.type === "picture_choice" && (
                    <PictureChoice
                      form={form}
                      index={index}
                      slide={slide}
                    />
                  )} */}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="theme" className="flex flex-col gap-4 w-full">
              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Font Family</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font.id} value={font.id}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose a Theme</FormLabel>
                    <FormControl>
                      <ThemeSelector form={form} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          {/* Remove Slide Button */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={() => {
              const newSlides = form
                .getValues("screens")
                .filter((_, index) => index !== currentSlideIndex);
              form.setValue("screens", newSlides);
              // Optionally, you might want to update the currentSlideIndex in the parent component
            }}
          >
            Remove Slide
          </Button>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default RightSidebar;
