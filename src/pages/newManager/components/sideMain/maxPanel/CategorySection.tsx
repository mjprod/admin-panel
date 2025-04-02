import React from "react";
import { useTranslation } from "react-i18next";
import FilterSelectList from "../../../../../components/dropDown/FilterSelectList";
import styles from "./CategorySection.module.css";
import { useEffect, useState } from "react";
import { SubCategory, Category } from "../../../../../util/ExampleData";
import { FilterSelectProps } from "../../../../../components/dropDown/FilterSelect";
import Checkbox from "../../../../../components/button/Checkbox";
import { useAppSelector } from "../../../../../store/hooks";

interface CategorySectionProps {
  showBackend?: boolean;
  setSelectedCategory: (selectedCategory: number) => void;
  setSubSelectedCategory: (selectedSubCategory: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  showBackend = false,
}) => {
  const { t } = useTranslation();
  const {categories, subCategories} = useAppSelector((state) => state.category)

  const [subCategoryOptions, setSubCategoryOptions] =
    useState<SubCategory[]>(subCategories);
  const [categoryOptions, setCategoryOptions] =
    useState<Category[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSubCategoryOptions(subCategories);
    setCategoryOptions(categories);
  }, [categories, subCategories]);

  useEffect(() => {
    if (selectedCategory == 0) {
      setSubCategoryOptions(subCategories);
    } else {
      const filteredSubs = subCategories.filter(
        (sub) => sub.category == selectedCategory
      );
      setSubCategoryOptions(filteredSubs);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory != 0) {
      const selected = subCategories.find(
        (sub) => sub.id === selectedSubCategory
      );
      const selectedCat = categories.filter(
        (cat) => cat.id == selected?.category
      );
      if (selectedCategory == 0 || selectedCategory != selected?.category) {
        setCategoryOptions(selectedCat ?? categories);
      }
    } else {
      setCategoryOptions(categories);
    }
  }, [selectedSubCategory]);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  const data: FilterSelectProps[] = [
    {
      hint: t("createNewButton.category"),
      options: categoryOptions,
      onChange: setSelectedCategory,
      classNameStyle: styles["category_view"],
    },
    {
      hint: t("createNewButton.subcategory"),
      options: subCategoryOptions,
      onChange: setSubSelectedCategory,
      classNameStyle: styles["category_view"],
    },
  ];
  return (
    <div className={styles["category-row"]}>
      <FilterSelectList data={data} />
      {showBackend && (
        <div className={styles["rightcol"]}>
          <Checkbox checked={checked} onChange={handleChange} />
          <p>Backend</p>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
